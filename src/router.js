import { h } from 'preact'
import Router from 'preact-router'

import { App } from "./App";

export default () => (
  <Router>
    <App path="/" />
  </Router>
)