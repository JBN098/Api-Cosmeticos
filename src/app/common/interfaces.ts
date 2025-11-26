export interface ApiResponseCosmeticosByPage {
  cosmeticos: CosmeticosData
}

export interface Cosmetico {
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}

export interface CosmeticosData {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: any
}

export interface ApiResponseCRUDCosmetico{
  message: string
}
