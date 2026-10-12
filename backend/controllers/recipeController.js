import Groq from "groq-sdk"
import { updateSpan, updateTrace, withSpan } from "confident-trace";

export const generateRecipe = async(req,res) =>{
    try{
      const { ingredients, testCaseId } = req.body ?? {};

      if(!ingredients){
        return res.status(400).json({error:"Ingredients required"})
      }
      
      const groq = new Groq({
        apiKey:process.env.GROQ_API_KEY
      });

      const recipe = await withSpan(
        { name: "POST /api/recipe/generate", type: "custom" },
        async () => {
          updateTrace({ testCaseId, input: ingredients });

          const prompt = `Create a simple recipe using ${ingredients}`;
          const completion = await withSpan(
            {
              name: "groq.chat.completions.create",
              type: "llm",
            },
            async () => {
              updateSpan({
                model: "llama-3.1-8b-instant",
                provider: "groq",
                input: prompt,
              });

              const response = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                  {
                    role: "user",
                    content: prompt,
                  },
                ],
              });

              updateSpan({
                model: "llama-3.1-8b-instant",
                provider: "groq",
                output: response.choices[0].message.content,
              });

              return response;
            },
          );

          const recipeText = completion.choices[0].message.content;
          updateTrace({ output: recipeText });
          return recipeText;
        },
      );

      res.json({
        recipe,
        source: "Groq AI (LLaMA 3.1)"
      })

    }catch(error){
        res.status(500).json({
            error:"AI generation failed",
            details:error.message
        })
    }
}
