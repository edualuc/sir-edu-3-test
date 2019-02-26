import React from 'react'
import './HomeView.scss'
import { logo } from '../../../constants/configConstants'

export const HomeView = () => (
  <div className="sir-home text-center">
    <img
      className="logo"
      src={logo} />
      <h4 className="title">SiG@Edu - Sistema de Gestão e Acompanhamento Educacional</h4>
  </div>
)

export default HomeView
