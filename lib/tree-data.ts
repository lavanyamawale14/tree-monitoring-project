export interface GrowthRecord {
  date: string
  height: number
}

export interface TreeData {
  id: number
  name: string
  type: string
  height: number
  healthStatus: "Healthy" | "Moderate" | "Needs Attention"
  datePlanted: string
  lat: number
  lng: number
  growthHistory: GrowthRecord[]
  imageUrl?: string
}

export const sampleTrees: TreeData[] = [
  {
    id: 1,
    name: "Mumbai Neem",
    type: "Neem (Azadirachta indica)",
    height: 12.5,
    healthStatus: "Healthy",
    datePlanted: "2021-03-15",
    lat: 19.076,
    lng: 72.8777,
    growthHistory: [
      { date: "2021-06", height: 2.0 },
      { date: "2021-12", height: 4.1 },
      { date: "2022-06", height: 6.3 },
      { date: "2022-12", height: 8.0 },
      { date: "2023-06", height: 9.8 },
      { date: "2023-12", height: 11.2 },
      { date: "2024-06", height: 12.5 },
    ],
  },
  {
    id: 2,
    name: "Delhi Peepal",
    type: "Peepal (Ficus religiosa)",
    height: 15.2,
    healthStatus: "Healthy",
    datePlanted: "2020-07-20",
    lat: 28.6139,
    lng: 77.209,
    growthHistory: [
      { date: "2020-12", height: 3.5 },
      { date: "2021-06", height: 5.8 },
      { date: "2021-12", height: 8.0 },
      { date: "2022-06", height: 10.2 },
      { date: "2022-12", height: 12.1 },
      { date: "2023-06", height: 13.8 },
      { date: "2023-12", height: 15.2 },
    ],
  },
  {
    id: 3,
    name: "Bangalore Banyan",
    type: "Banyan (Ficus benghalensis)",
    height: 18.7,
    healthStatus: "Moderate",
    datePlanted: "2019-01-10",
    lat: 12.9716,
    lng: 77.5946,
    growthHistory: [
      { date: "2019-06", height: 4.0 },
      { date: "2019-12", height: 6.5 },
      { date: "2020-06", height: 9.0 },
      { date: "2020-12", height: 11.3 },
      { date: "2021-06", height: 13.5 },
      { date: "2021-12", height: 15.2 },
      { date: "2022-06", height: 17.0 },
      { date: "2022-12", height: 18.7 },
    ],
  },
  {
    id: 4,
    name: "Chennai Tamarind",
    type: "Tamarind (Tamarindus indica)",
    height: 8.3,
    healthStatus: "Needs Attention",
    datePlanted: "2022-06-01",
    lat: 13.0827,
    lng: 80.2707,
    growthHistory: [
      { date: "2022-09", height: 1.5 },
      { date: "2022-12", height: 2.8 },
      { date: "2023-06", height: 4.5 },
      { date: "2023-12", height: 6.2 },
      { date: "2024-06", height: 8.3 },
    ],
  },
  {
    id: 5,
    name: "Kolkata Mango",
    type: "Mango (Mangifera indica)",
    height: 10.1,
    healthStatus: "Healthy",
    datePlanted: "2021-01-25",
    lat: 22.5726,
    lng: 88.3639,
    growthHistory: [
      { date: "2021-06", height: 2.2 },
      { date: "2021-12", height: 4.0 },
      { date: "2022-06", height: 5.8 },
      { date: "2022-12", height: 7.5 },
      { date: "2023-06", height: 8.8 },
      { date: "2023-12", height: 10.1 },
    ],
  },
  {
    id: 6,
    name: "Jaipur Ashoka",
    type: "Ashoka (Saraca asoca)",
    height: 6.4,
    healthStatus: "Healthy",
    datePlanted: "2023-02-14",
    lat: 26.9124,
    lng: 75.7873,
    growthHistory: [
      { date: "2023-06", height: 1.8 },
      { date: "2023-12", height: 3.5 },
      { date: "2024-06", height: 5.2 },
      { date: "2024-12", height: 6.4 },
    ],
  },
  {
    id: 7,
    name: "Hyderabad Gulmohar",
    type: "Gulmohar (Delonix regia)",
    height: 9.6,
    healthStatus: "Moderate",
    datePlanted: "2021-08-12",
    lat: 17.385,
    lng: 78.4867,
    growthHistory: [
      { date: "2021-12", height: 2.0 },
      { date: "2022-06", height: 3.8 },
      { date: "2022-12", height: 5.5 },
      { date: "2023-06", height: 7.2 },
      { date: "2023-12", height: 8.5 },
      { date: "2024-06", height: 9.6 },
    ],
  },
  {
    id: 8,
    name: "Pune Teak",
    type: "Teak (Tectona grandis)",
    height: 14.0,
    healthStatus: "Healthy",
    datePlanted: "2020-03-20",
    lat: 18.5204,
    lng: 73.8567,
    growthHistory: [
      { date: "2020-06", height: 2.5 },
      { date: "2020-12", height: 4.8 },
      { date: "2021-06", height: 7.0 },
      { date: "2021-12", height: 9.2 },
      { date: "2022-06", height: 11.0 },
      { date: "2022-12", height: 12.5 },
      { date: "2023-06", height: 14.0 },
    ],
  },
]

export const environmentalData = {
  co2Absorption: [
    { month: "Jan", amount: 42 },
    { month: "Feb", amount: 45 },
    { month: "Mar", amount: 52 },
    { month: "Apr", amount: 58 },
    { month: "May", amount: 65 },
    { month: "Jun", amount: 71 },
    { month: "Jul", amount: 68 },
    { month: "Aug", amount: 74 },
    { month: "Sep", amount: 62 },
    { month: "Oct", amount: 55 },
    { month: "Nov", amount: 48 },
    { month: "Dec", amount: 44 },
  ],
  oxygenProduction: [
    { month: "Jan", amount: 85 },
    { month: "Feb", amount: 90 },
    { month: "Mar", amount: 105 },
    { month: "Apr", amount: 118 },
    { month: "May", amount: 132 },
    { month: "Jun", amount: 145 },
    { month: "Jul", amount: 138 },
    { month: "Aug", amount: 150 },
    { month: "Sep", amount: 125 },
    { month: "Oct", amount: 112 },
    { month: "Nov", amount: 98 },
    { month: "Dec", amount: 88 },
  ],
}
