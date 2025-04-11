"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBot from "react-chatbotify";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const MyChatBot = () => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY); 

  const productInfo = `
  Nossos produtos:
  
  - Capeletti de Queijo | Categoria: Massas | Marca: Massa Leve | Preço: R$24,90 | Peso: 400g | Unidade: Pacote
  - Batata Palito | Categoria: Congelados | Marca: Seara | Preço: R$32,50 | Peso: 2Kg | Unidade: Pacote
  - Presunto Cozido | Categoria: Embutidos | Marca: Sadia | Preço: R$48,90 | Peso: 3,5Kg | Unidade: Peça
  - Bacon em cubos | Categoria: Embutidos | Marca: Frimesa | Preço: R$29,90 | Peso: 1Kg | Unidade: Pacote
  - Chicken Supreme | Categoria: Congelados | Marca: Seara | Preço: R$42,90 | Peso: 2Kg | Unidade: Pacote
  - Queijo Mussarela | Categoria: Laticínios | Marca: Polenghi | Preço: R$39,99 | Peso: 3,5Kg | Unidade: Peça
  - Queijo Prato | Categoria: Laticínios | Marca: Polenghi | Preço: R$39,99 | Peso: 3,5Kg | Unidade: Peça
  - Atum Ralado | Categoria: Conservas | Marca: Gomes da Costa | Preço: R$6,49 | Peso: 170g | Unidade: Lata
  - Patê de Atum | Categoria: Conservas | Marca: Gomes da Costa | Preço: R$15,90 | Peso: 170g | Unidade: Lata
  - Salame Italiano | Categoria: Embutidos | Marca: Seara | Preço: R$78,90 | Peso: 700g | Unidade: Peça
  
  Serviços e Informações:
  
  - Entregas disponíveis apenas para o estado do Rio de Janeiro
  - Regiões atendidas: Capital, Baixada, Região dos Lagos, Serrana e Sul Fluminense
  - Atendimento: Segunda a sexta-feira, das 8h às 18h
  - Frete grátis para compras acima de R$150,00
  - Pedidos abaixo de R$150,00: Frete fixo de R$9,90
  - Prazo de entrega: 3 a 5 dias úteis
  - Todos os pedidos acompanham nota fiscal
  - Política de devolução: Aceitamos devoluções em até 7 dias após o recebimento (produto lacrado)
  
  Formas de Pagamento:
  
  - Aceitamos cartão de crédito, débito e PIX
  - Parcelamento em até 3x sem juros no cartão
  
  Atendimento:
  
  - Dúvidas sobre entregas ou pedidos? Fale com nosso suporte via WhatsApp.
  - Caso não saiba responder algo, utilize variações de: "Desculpe, não sei a resposta. Por favor, entre em contato com nosso suporte via WhatsApp para mais informações."
  - Número do whatsapp: (21) 99999-9999
  - Horário de atendimento: Segunda a sexta-feira, das 8h às 18h
  
  Privacidade e segurança:
  
  - Seus dados são usados apenas para finalização da compra e envio
  - Trabalhamos apenas com marcas reconhecidas e produtos com procedência garantida

  Sobre o desenvolvedor:

- Este site é um projeto pessoal desenvolvido por Lucas Goes Lima.
- Caso tenha interesse em conhecer mais projetos ou entrar em contato, acesse: https://github.com/lukegoes
  `;

  const styles = {
    headerStyle: {
      background: '#031835',
      color: '#ffffff',
      padding: '13px',
    },
    chatWindowStyle: {
      backgroundColor: '#f5f7fa',
    },
    chatButtonStyle: {
      background: '#2980b9',
      width: '65px',
      height: '65px',
    },
  };
  
  

  async function run(prompt, streamMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const fullPrompt = `Você é um chatbot de suporte ao cliente no modelo de um site para uma empresa que oferece os seguintes produtos e serviços:
    ${productInfo}

    Responda apenas a perguntas relacionadas a esses produtos e serviços.
    Se a pergunta não for sobre nossos produtos ou serviços,
    responda educadamente que você só pode fornecer informações sobre eles.
    Se a pergunta for sobre algum produto ou serviço mas que você não tem a informação,
    encaminhar o cliente para o atendimento via whatsapp.
    Não precisa falar em toda resposta sobre só o quê você pode responder.

    Pergunta do usuário: ${prompt}`;

    const result = await model.generateContentStream(fullPrompt);
    let fullText = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      streamMessage(fullText);
    }
  }

  const flow = {
    start: {
      message: "Como posso te ajudar com nossos produtos e serviços?",
      path: "model_loop",
    },
    model_loop: {
      message: async (params) => {
        await run(params.userInput, params.streamMessage);
        return "";
      },
      path: "model_loop"
    },
  };
 
  const settings = {
    general: {
      primaryColor: "#1C8147",
      secondaryColor: "#3E7397",
      fontFamily: "Poppins, sans-serif"},

      notification: {
        disabled: false,
        defaultToggledOn: true,
        volume: 0.1,
        showCount: true,
        icon: () => <NotificationsIcon style={{ width: 30, height: 30, color: "#FED920" }} />,
        iconDisabled: () => <NotificationsOffIcon style={{ width: 30, height: 30, color: "#fff" }} />,
      },


    tooltip: {
      mode: "NEVER",
      text: <div
      style={{ fontSize: 14, cursor: "default", color: "#000", fontWeight: "bold"}}
    >
      Precisa de ajuda?
    </div>
    },

    chatButton: {
    icon: () => <ChatIcon style={{ width: 35, height: 35, color: "#fff" }} />
    },

    chatInput: {
      disabled: false,
      enabledPlaceholderText: "Digite sua mensagem...",
      disabledPlaceholderText: "",
    },

    chatHistory: {
      disabled: false,
      maxEntries: 10,
      storageKey: "rcb-history",
      storageType: "LOCAL_STORAGE",
      viewChatHistoryButtonText: "Carregar histórico ⟳",
      chatHistoryLineBreakText: "----- Fim do Histórico de Conversa -----",
      autoLoad: false,
    },
    
    footer: {
      text: (
        <div style={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center"}} 
          onClick={() => window.open("https://github.com/lukegoes")}
        >
          <span key={0}>Site desenvolvido por LukeGoes</span>
          </div>
      ),
    },

    fileAttachment: {
      disabled: true,
    },
    emoji: {
      disabled: true,
    },
    
    header: {
      title: (
        <div
          style={{cursor: "pointer", margin: 0, fontWeight: "bold", fontSize: 20 }} onClick={
            () => window.open("https://github.com/lukegoes/")
          }
        >
          Luke Bot
        </div>
      ),
      showAvatar: true,
      avatar:"/iconebot.png",
    },
  }

  return (
    <ChatBot
    flow={flow}
    settings={settings}
    styles={styles}
    />
  );
};
export default MyChatBot;