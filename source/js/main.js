import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4tYNECjeTv_nPfTxpVoY_tF0WQmK1_u0",
  authDomain: "cyberbullying-quiz.firebaseapp.com",
  projectId: "cyberbullying-quiz",
  storageBucket: "cyberbullying-quiz.firebasestorage.app",
  messagingSenderId: "408069613262",
  appId: "1:408069613262:web:3bda65ac85d4753347d29f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar resultado
async function salvarResultado(pontos) {
  try {
    await addDoc(collection(db, "respostas"), {
      pontuacao: pontos,
      data: new Date().toISOString()
    });

    console.log("Salvo com sucesso!");
  } catch (erro) {
    console.error("Erro completo:", erro);
    console.error("Mensagem:", erro.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const botao = document.getElementById("Q_BTN");
  const resultado = document.getElementById("resultado");

  botao.addEventListener("click", () => {

    const perguntas = ["q1", "q2", "q3", "q4", "q5"];
    let pontos = 0;
    let respondidas = 0;

    perguntas.forEach(pergunta => {
      const resposta = document.querySelector(`input[name="${pergunta}"]:checked`);

      if (resposta) {
        respondidas++;

        if (resposta.value === "C") {
          pontos++;
        }
      }
    });

    // Verifica se respondeu tudo
    if (respondidas < perguntas.length) {
      resultado.innerHTML = "⚠️ Responda todas as perguntas antes de ver o resultado.";
      resultado.className = "resultado-medio";
      resultado.classList.add("show");
      return;
    }

    // 🔥 Salva no Firebase
    salvarResultado(pontos);

    // Mostra resultado
    if (pontos >= 4) {
      resultado.innerHTML = "🟢 Você está preparado para lidar com cyberbullying.";
      resultado.className = "resultado-bom";
    }
    else if (pontos >= 2) {
      resultado.innerHTML = "🟡 Você tem consciência, mas pode melhorar.";
      resultado.className = "resultado-medio";
    }
    else {
      resultado.innerHTML = "🔴 Atenção! Suas atitudes podem contribuir para o cyberbullying.";
      resultado.className = "resultado-ruim";
    }

    // Scroll suave
    resultado.scrollIntoView({ behavior: "smooth" });

    // Animação
    resultado.classList.remove("show");

    setTimeout(() => {
      resultado.classList.add("show");
    }, 50);

  });

});