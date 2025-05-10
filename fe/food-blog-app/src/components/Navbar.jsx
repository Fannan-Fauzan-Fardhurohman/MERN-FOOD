import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import InputForm from "./inputForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const checkLogin = () => {
    setIsOpen(true);
  };
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li>Home</li>
          <li>My Recipes</li>
          <li>Favorites</li>
          <li onClick={() => setIsOpen(true)}>Login</li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm />
        </Modal>
      )}
    </>
  );
}
