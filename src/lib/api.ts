import axios from 'axios'
import { envs } from '../configs/envs'

export const api = axios.create({
  baseURL: envs.app.nextUrl
})
