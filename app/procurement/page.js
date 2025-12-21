"use client";
import { useState, useEffect, useRef } from 'react';

const SUPPLIERS = [
  { id: 1, name: "Memphis Equipment", flag: "🇺🇸", rating: 4.8, leadTime: 14 },
  { id: 2, name: "Midwest Military", flag: "🇺🇸", rating: 4.5, leadTime: 10 },
  { id: 3, name: "Oshkosh Defense", flag: "🇺🇸", rating: 4.9, leadTime: 21 },
  { id: 4, name: "GovPlanet", flag: "🇺🇸", rating: 4.2, leadTime: 7 },
  { id: 5, name: "GDLS Canada", flag: "🇨🇦", rating: 4.6, leadTime: 25 },
];

const PRODUCTS = [
  { name: "Brake Shoes M939", nameUa: "Гальмівні колодки M939", nsn: "2530-01-XXX", priceMin: 35, priceMax: 65, keys: ["гальм", "brake", "колодк"] },
  { name: "Tire 395/85R20", nameUa: "Шина 395/85R20", nsn: "2610-01-XXX", priceMin: 400, priceMax: 650, keys: ["шин", "tire"] },
  { name: "Oil Filter", nameUa: "Масляний фільтр", nsn: "2940-01-XXX", priceMin: 15, priceMax: 35, keys: ["фільтр", "filter"] },
  { name: "Starter Motor", nameUa: "Стартер 24В", nsn: "2920-01-XXX", priceMin: 180, priceMax: 350, keys: ["стартер", "starter"] },
  { name: "Radiator", nameUa: "Радіатор", nsn: "2930-01-XXX", priceMin: 350, priceMax: 600, keys: ["радіатор", "radiator"] },
];

const LOGISTICS
