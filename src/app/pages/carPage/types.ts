export interface IImage {
  path: string
  url: string
  width: number
  height: number
}

export interface ILabelPosition {
  x: number
  y: number
  width: number
  height: number
}

export interface IRegistrationBook {
  image?: IImage
  registeredDate?: string
  licensePlateNo: string
  province: string
  bodyType?: string
  vehicleType?: string
  makeBrand?: string
  model?: string
  modelText?: string
  modelYear?: string
  subModel?: string
  color?: string[]
  otherColor?: string
  vinFrameNo?: string
  framePosition?: string
  fuel?: string
  engineBrand?: string
  engineNo?: string
  enginePosition?: string
  cylinder?: string
  cc?: string
  hp?: string
  axle?: string
  wheels?: string
  tyres?: string
  textFromTheBook?: string
  authorizedDate?: string
  purchase?: {
    purchasePrice: string
    appraisedDatePurchase: string
  }
  sale?: {
    salePrice: string
    appraisedDateSale: string
  }
}

export interface ICarPhotos {
  image: IImage
  angle: string
  licensePlate: {
    position: ILabelPosition
    licensePlateNo?: string
    province?: string
  }
}

export interface IConsole {
  image: IImage
  gear: string
  gearPosition: ILabelPosition
}

export interface IDashboard {
  image: IImage
  mileageODO: {
    position: ILabelPosition
    value: string
  }
  mileageTrip: {
    position: ILabelPosition
    value: string
  }
}

export interface ITaxSign {
  image: IImage
  licensePlateNo: string
  expiryDate: string
  make: string
  vinFrameNo: string
}

export interface ICarInformation {
  id?: string
  submitterId?: string
  lastUpdateById?: string
  status?: string
  registrationBook: IRegistrationBook
  carPhotos?: ICarPhotos[]
  console?: IConsole
  dashboard?: IDashboard
  taxSign?: ITaxSign
}

