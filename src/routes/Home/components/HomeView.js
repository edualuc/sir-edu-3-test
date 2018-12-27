import React from 'react'
import logo from 'public/sir-edu_logo.png'
import './HomeView.scss'

export const HomeView = () => (
  <div className="sir-home text-center">
    <img
      className="logo"
      src={logo} />
      <h4 className="title">Sistema de Gestão e Acompanhamento Educacional</h4>
  </div>
)

export default HomeView
