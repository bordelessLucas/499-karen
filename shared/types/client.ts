export type ClientStatus = 'ativo' | 'prospecto' | 'inativo'

export type Client = {
  id: string
  name: string
  company: string
  email: string
  status: ClientStatus
  lastContact: string
}
