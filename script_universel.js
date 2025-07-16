
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commande");
  const afficherBtn = document.getElementById("afficher");
  const resultatDiv = document.getElementById("resultat");

  const raccourcis = {
    "i": "Qui",
    "oi": "Quoi",
    "ou": "Où",
    "an": "Quand",
    "ent": "Comment",
    "ien": "Combien",
    "as": "As",
    "br": "Bris"
  };

  const chargerFichier = (catAbr, numero) => {
    const cat = raccourcis[catAbr] || catAbr.charAt(0).toUpperCase() + catAbr.slice(1).toLowerCase();
    const fichier = (cat === "Bris") ? "data/bris_final.json" : "data/questions-reponses_FINAL_PROPRE.json";

    fetch(fichier)
      .then(response => {
        if (!response.ok) throw new Error("Fichier introuvable");
        return response.json();
      })
      .then(data => {
        const carte = data.find(item =>
          item.numero === parseInt(numero, 10) && item.categorie === cat
        );
        if (carte) {
          resultatDiv.innerHTML = `<p><em>${carte.categorie}</em> – ${carte.texte}</p>`;
        } else {
          resultatDiv.innerHTML = "<p>Aucune carte trouvée.</p>";
        }
      })
      .catch(() => {
        resultatDiv.innerHTML = "<p>Erreur lors du chargement du fichier.</p>";
      });
  };

  const executerCommande = () => {
    const valeur = input.value.trim();
    const [abr, num] = valeur.split(" ");
    if (abr && num) {
      chargerFichier(abr.toLowerCase(), num);
    } else {
      resultatDiv.innerHTML = "<p>Commande invalide. Ex : i 24, br 77</p>";
    }
  };

  afficherBtn.addEventListener("click", executerCommande);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      executerCommande();
    }
  });
});
