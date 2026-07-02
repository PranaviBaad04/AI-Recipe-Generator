export default function RecipeHistory({ history }) {
  if (history.length === 0) return null;

  const styles = {
    container: {
      marginTop: "40px",
    },

    title: {
      textAlign: "center",
      color: "#4B2E83",
      fontSize: "30px",
      fontWeight: "bold",
      marginBottom: "25px",
    },

    card: {
      background: "#ffffff",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
      borderLeft: "6px solid #667eea",
    },

    badge: {
      display: "inline-block",
      background: "linear-gradient(90deg,#667eea,#764ba2)",
      color: "#fff",
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "13px",
      marginBottom: "18px",
    },

    heading: {
      color: "#4B2E83",
      fontSize: "18px",
      marginBottom: "8px",
      marginTop: "10px",
    },

    ingredients: {
      background: "#F8F9FF",
      padding: "12px",
      borderRadius: "10px",
      color: "#555",
      lineHeight: "1.7",
      marginBottom: "18px",
      border: "1px solid #e5e7eb",
    },

    recipeBox: {
      background: "#F8F9FF",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
    },

    recipe: {
      margin: 0,
      whiteSpace: "pre-wrap",
      lineHeight: "1.8",
      color: "#444",
      fontSize: "15px",
      overflowX: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📜 Recipe History</h2>

      {history.map((item, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.badge}>
            Recipe #{history.length - index}
          </div>

          <h4 style={styles.heading}>🥗 Ingredients</h4>

          <div style={styles.ingredients}>
            {item.ingredients}
          </div>

          <h4 style={styles.heading}>🍲 Recipe</h4>

          <div style={styles.recipeBox}>
            <pre style={styles.recipe}>
              {item.recipe}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}