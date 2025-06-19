import { makeNWSRequest } from "../api/weather.js";
import { WEATHER_API } from "../constants/index.js";
import {
  AlertsResponse,
  PointsResponse,
  ForecastResponse,
} from "../types/weather.js";

export async function getStateAlerts(
  stateCode: string
): Promise<AlertsResponse | null> {
  const alertsUrl = `${WEATHER_API}/alerts?area=${stateCode}`;
  return makeNWSRequest<AlertsResponse>(alertsUrl);
}

export async function getLocationForecast(lat: number, lng: number) {
  // 获取网格点数据
  const pointsUrl = `${WEATHER_API}/points/${lat.toFixed(4)},${lng.toFixed(4)}`;
  const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

  if (!pointsData || !pointsData.properties?.forecast) {
    return null;
  }

  // 获取预报数据
  return makeNWSRequest<ForecastResponse>(pointsData.properties.forecast);
}
