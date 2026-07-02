import { useState } from "react";
import { generateRecipeAPI } from "../api/recipeAPI";
import Loader from "./Loader";
import RecipeHistory from "./RecipeHistory";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter ingredients.");
      return;
    }

    setError("");
    setLoading(true);
    setRecipe("");

    try {
      const data = await generateRecipeAPI(ingredients);

      setRecipe(data.recipe);

      setHistory((prev) => [
        {
          ingredients,
          recipe: data.recipe,
        },
        ...prev,
      ]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    },

    card: {
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      borderRadius: "20px",
      padding: "35px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    },

    header: {
      textAlign: "center",
      marginBottom: "30px",
    },

    title: {
      margin: 0,
      color: "#4b2e83",
      fontSize: "36px",
    },

    subtitle: {
      marginTop: "10px",
      color: "#666",
      fontSize: "16px",
    },

    inputCard: {
      background: "#f8f9ff",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "25px",
    },

    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#444",
      fontSize: "17px",
    },

    textarea: {
      width: "100%",
      minHeight: "150px",
      padding: "15px",
      borderRadius: "12px",
      border: "2px solid #ddd",
      outline: "none",
      resize: "vertical",
      fontSize: "16px",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      marginTop: "20px",
      padding: "15px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(90deg,#667eea,#764ba2)",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    error: {
      marginTop: "15px",
      background: "#ffe5e5",
      color: "#d8000c",
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "bold",
    },

    loader: {
      marginTop: "20px",
      textAlign: "center",
    },

    output: {
      marginTop: "30px",
      background: "#f8f9ff",
      padding: "25px",
      borderRadius: "15px",
      borderLeft: "6px solid #667eea",
    },

    outputTitle: {
      marginBottom: "15px",
      color: "#4b2e83",
    },

    pre: {
      whiteSpace: "pre-wrap",
      lineHeight: "1.8",
      fontSize: "15px",
      color: "#444",
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🍽️ AI Recipe Generator</h1>

          <p style={styles.subtitle}>
            Turn simple ingredients into amazing recipes with AI.
          </p>
        </div>

        <div style={styles.inputCard}>
          <label style={styles.label}>
            🥕 Enter Ingredients
          </label>

          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Example: Rice, Tomato, Onion, Garlic..."
            style={styles.textarea}
          />

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateRecipe}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Generating..." : "✨ Generate Recipe"}
          </button>
        </div>

        {loading && (
          <div style={styles.loader}>
            <Loader />
          </div>
        )}

        {recipe && (
          <div style={styles.output}>
            <h2 style={styles.outputTitle}>🍲 Generated Recipe</h2>

            <pre style={styles.pre}>
              {recipe}
            </pre>
          </div>
        )}

        <RecipeHistory history={history} />
      </div>
    </div>
  );
}