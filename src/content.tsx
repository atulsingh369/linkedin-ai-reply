import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AIIcon from "./components/AIIcon";
import Modal from "./components/Modal";

const AIReplyExtension: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputField, setInputField] = useState<HTMLTextAreaElement | null>(
    null
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const textArea = document.querySelector(
            'div[contenteditable="true"][aria-label="Write a message…"]'
          ) as HTMLTextAreaElement;
          if (textArea && textArea !== inputField) {
            setInputField(textArea);
            addAIIcon(textArea);
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [inputField]);

  const addAIIcon = (textArea: HTMLTextAreaElement) => {
    const iconContainer = document.createElement("div");
    iconContainer.style.cursor = "pointer";
    iconContainer.style.position = "absolute";
    iconContainer.style.right = "40px"; // Adjust as needed
    iconContainer.style.bottom = "10px";
    iconContainer.style.zIndex = "1000"; // Ensure it's above other elements

    const root = ReactDOM.createRoot(iconContainer);
    root.render(<AIIcon />);

    iconContainer.addEventListener("click", () => setShowModal(true));
    textArea.parentElement?.appendChild(iconContainer);
  };

  const handleGenerate = (command: string) => {
    const comm = command.trim();
    console.log(comm);
    const dummyResponse =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    if (inputField) {
      inputField.value = dummyResponse;
      inputField.dispatchEvent(new Event("input", { bubbles: true }));
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onGenerate={handleGenerate}
        />
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<AIReplyExtension />);
