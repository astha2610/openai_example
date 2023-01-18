import css from './index.css';

import { h, render } from 'preact'

import Router from './router'

const app = document.getElementById('app')

render(
  <Router />,
  app,
  app.lastChild
)