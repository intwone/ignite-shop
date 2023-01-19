import axios from 'axios'
import { envs } from '@/src/configs/envs'

export const api = axios.create({
  baseURL: envs.app.nextUrl
})
