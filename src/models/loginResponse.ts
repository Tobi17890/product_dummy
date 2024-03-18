interface IRequestLogin {
  username: string
  password: string
}

interface IResponseLogin {
  id: string
  token: string
  email: string
  firstname: string
  lastname: string
  gender: string
  image: string
}
export type { IRequestLogin, IResponseLogin }
