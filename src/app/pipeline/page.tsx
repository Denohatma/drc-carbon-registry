'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, ExternalLink, X, MapPin, DollarSign, Users, Calendar, FileText } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

interface PipelineProject {
  id: string;
  name: string;
  province: string;
  sponsor: string;
  sector: string;
  status: 'Feasibility' | 'Due Diligence' | 'Negotiation' | 'Approved' | 'Concept' | 'Validation';
  investmentNeed: number;
  description: string;
  methodology: string;
  estimatedCredits: number;
  startDate: string;
  duration: string;
  contact: string;
  coordinates: string;
  cobenefits: string[];
}

const projects: PipelineProject[] = [
  {
    id: 'PP-001',
    name: 'Yangambi Biosphere REDD+',
    province: 'Tshopo',
    sponsor: 'CIFOR-ICRAF',
    sector: 'REDD+ / Avoided Deforestation',
    status: 'Due Diligence',
    investmentNeed: 12500000,
    description: 'Large-scale REDD+ project in the Yangambi Biosphere Reserve targeting avoided deforestation and degradation across 235,000 hectares of tropical rainforest. Involves community-based forest management and agroforestry alternatives.',
    methodology: 'VCS VM0015',
    estimatedCredits: 3200000,
    startDate: '2027-Q1',
    duration: '30 years',
    contact: 'Dr. Paolo Cerutti, CIFOR',
    coordinates: '0.8°N, 24.5°E',
    cobenefits: ['Biodiversity conservation', 'Community livelihoods', 'Research infrastructure'],
  },
  {
    id: 'PP-002',
    name: 'Virunga Improved Cookstoves',
    province: 'Nord-Kivu',
    sponsor: 'Virunga Foundation',
    sector: 'Clean Cooking',
    status: 'Approved',
    investmentNeed: 3800000,
    description: 'Distribution of 120,000 fuel-efficient cookstoves to communities around Virunga National Park, reducing charcoal demand by 60% and protecting gorilla habitat from encroachment.',
    methodology: 'Gold Standard Methodology',
    estimatedCredits: 450000,
    startDate: '2026-Q4',
    duration: '10 years',
    contact: 'Emmanuel de Merode, Virunga Foundation',
    coordinates: '1.5°S, 29.2°E',
    cobenefits: ['Health improvement', 'Forest protection', 'Women empowerment', 'Gorilla habitat'],
  },
  {
    id: 'PP-003',
    name: 'Mai-Ndombe Peatland Conservation',
    province: 'Mai-Ndombe',
    sponsor: 'Wildlife Works Carbon',
    sector: 'Peatland / Blue Carbon',
    status: 'Feasibility',
    investmentNeed: 18000000,
    description: 'Conservation of 480,000 hectares of tropical peatlands in the Cuvette Centrale, one of the world\'s largest tropical peatland complexes storing an estimated 30 Gt of carbon.',
    methodology: 'VCS VM0036 (Rewetting)',
    estimatedCredits: 8500000,
    startDate: '2028-Q2',
    duration: '40 years',
    contact: 'Mike Korchinsky, Wildlife Works',
    coordinates: '1.5°S, 18.0°E',
    cobenefits: ['Peatland preservation', 'Indigenous rights', 'Hydrological regulation'],
  },
  {
    id: 'PP-004',
    name: 'Kasaï Reforestation Initiative',
    province: 'Kasaï',
    sponsor: 'One Tree Planted / Local NGO Coalition',
    sector: 'ARR / Reforestation',
    status: 'Concept',
    investmentNeed: 7200000,
    description: 'Reforestation of 45,000 hectares of degraded savanna-forest mosaic in Kasaï province using native species. Combines carbon sequestration with agroforestry income for 15,000 smallholders.',
    methodology: 'VCS VM0047 (ARR)',
    estimatedCredits: 1800000,
    startDate: '2028-Q1',
    duration: '25 years',
    contact: 'Marie Lufungula, Kasaï Green Network',
    coordinates: '5.0°S, 20.8°E',
    cobenefits: ['Soil restoration', 'Smallholder income', 'Food security'],
  },
  {
    id: 'PP-005',
    name: 'Bukavu Biogas Programme',
    province: 'Sud-Kivu',
    sponsor: 'SNV Netherlands / Equity BCDC',
    sector: 'Biogas / Waste-to-Energy',
    status: 'Validation',
    investmentNeed: 4500000,
    description: 'Installation of 8,000 household biogas digesters and 12 institutional systems across Sud-Kivu, converting agricultural waste into clean cooking fuel and organic fertiliser.',
    methodology: 'CDM AMS-I.I',
    estimatedCredits: 280000,
    startDate: '2027-Q2',
    duration: '15 years',
    contact: 'Jean-Pierre Habimana, SNV DRC',
    coordinates: '2.5°S, 28.8°E',
    cobenefits: ['Waste management', 'Fertiliser production', 'Energy access'],
  },
  {
    id: 'PP-006',
    name: 'Équateur Community Forest Management',
    province: 'Équateur',
    sponsor: 'Rainforest Alliance / UNDP',
    sector: 'REDD+ / Community Forestry',
    status: 'Negotiation',
    investmentNeed: 9800000,
    description: 'Community-led forest management across 320,000 hectares involving 42 local communities in the Équateur Province. Includes FPIC processes, land tenure formalisation, and sustainable timber harvesting.',
    methodology: 'VCS VM0009',
    estimatedCredits: 4100000,
    startDate: '2027-Q3',
    duration: '30 years',
    contact: 'Adèle Bokungu, Rainforest Alliance DRC',
    coordinates: '0.3°N, 20.5°E',
    cobenefits: ['Land tenure security', 'Sustainable timber', 'Community governance'],
  },
  {
    id: 'PP-007',
    name: 'Kinshasa Urban Solar Micro-grids',
    province: 'Kinshasa',
    sponsor: 'Nuru Energy / IFC',
    sector: 'Renewable Energy',
    status: 'Due Diligence',
    investmentNeed: 15000000,
    description: 'Deployment of 250 solar micro-grids serving 75,000 households in peri-urban Kinshasa, displacing diesel generators and kerosene lamps while improving energy access for underserved communities.',
    methodology: 'Gold Standard RE Methodology',
    estimatedCredits: 520000,
    startDate: '2027-Q1',
    duration: '20 years',
    contact: 'Jonathan Lehman, Nuru Energy',
    coordinates: '4.3°S, 15.3°E',
    cobenefits: ['Energy access', 'Air quality', 'Job creation', 'Education'],
  },
  {
    id: 'PP-008',
    name: 'Lomami-Lualaba Wildlife Corridor',
    province: 'Maniema',
    sponsor: 'Frankfurt Zoological Society / WWF',
    sector: 'REDD+ / Biodiversity',
    status: 'Feasibility',
    investmentNeed: 22000000,
    description: 'Establishing a 180 km forest corridor connecting Lomami and Lualaba protected areas to prevent habitat fragmentation. Protects bonobo and okapi populations while sequestering carbon across 280,000 hectares.',
    methodology: 'VCS VM0015 + CCB Standards',
    estimatedCredits: 5800000,
    startDate: '2029-Q1',
    duration: '35 years',
    contact: 'Dr. Terese Hart, TL2 Project',
    coordinates: '2.5°S, 26.5°E',
    cobenefits: ['Bonobo conservation', 'Okapi habitat', 'Anti-poaching patrols'],
  },
  {
    id: 'PP-009',
    name: 'Ituri Sustainable Charcoal Transition',
    province: 'Ituri',
    sponsor: 'GIZ / EU Forest Programme',
    sector: 'Clean Cooking / Forestry',
    status: 'Concept',
    investmentNeed: 5600000,
    description: 'Transition 50,000 households from unsustainable charcoal to briquettes from agricultural residues and planted woodlots. Establishes 3,000 hectares of fast-growing energy plantations.',
    methodology: 'CDM AMS-II.G + AMS-I.E',
    estimatedCredits: 350000,
    startDate: '2028-Q3',
    duration: '15 years',
    contact: 'Klaus Werner, GIZ DRC',
    coordinates: '1.8°N, 30.5°E',
    cobenefits: ['Deforestation reduction', 'Rural employment', 'Energy security'],
  },
  {
    id: 'PP-010',
    name: 'Haut-Katanga Mine Rehabilitation',
    province: 'Haut-Katanga',
    sponsor: 'Ivanhoe Mines / AfCEN',
    sector: 'ARR / Mine Rehabilitation',
    status: 'Negotiation',
    investmentNeed: 8500000,
    description: 'Rehabilitation and reforestation of 12,000 hectares of abandoned artisanal mining sites in the copper belt. Uses native Miombo woodland species combined with soil remediation techniques.',
    methodology: 'VCS VM0047 (ARR)',
    estimatedCredits: 720000,
    startDate: '2027-Q4',
    duration: '25 years',
    contact: 'Patricia Kalume, Ivanhoe Mines CSR',
    coordinates: '11.7°S, 27.5°E',
    cobenefits: ['Soil remediation', 'Biodiversity recovery', 'Community health'],
  },
  {
    id: 'PP-011',
    name: 'Lac Kivu Methane Capture',
    province: 'Sud-Kivu',
    sponsor: 'KivuWatt / Symbion Power',
    sector: 'Methane Avoidance',
    status: 'Due Diligence',
    investmentNeed: 35000000,
    description: 'Extraction and utilisation of dissolved methane from Lake Kivu for power generation, preventing catastrophic limnic eruption while generating 56 MW of baseload electricity for eastern DRC.',
    methodology: 'CDM AM0077',
    estimatedCredits: 1200000,
    startDate: '2027-Q2',
    duration: '25 years',
    contact: 'Robert Sobhani, Symbion Power',
    coordinates: '2.0°S, 29.0°E',
    cobenefits: ['Disaster risk reduction', 'Energy access', 'Industrial development'],
  },
  {
    id: 'PP-012',
    name: 'Bas-Uele Forest Conservation Alliance',
    province: 'Bas-Uele',
    sponsor: 'African Parks / Moore Foundation',
    sector: 'REDD+ / Conservation',
    status: 'Feasibility',
    investmentNeed: 14000000,
    description: 'Protection of 520,000 hectares of intact forest landscape in northern DRC adjacent to Garamba National Park. Targets zero-deforestation through community forest concessions and anti-poaching enforcement.',
    methodology: 'VCS VM0015',
    estimatedCredits: 6200000,
    startDate: '2028-Q4',
    duration: '30 years',
    contact: 'Andrea Turkalo, African Parks DRC',
    coordinates: '3.8°N, 29.0°E',
    cobenefits: ['Elephant protection', 'Community concessions', 'Cross-border conservation'],
  },
  {
    id: 'PP-013',
    name: 'Mission 300 — Inga III Hydropower',
    province: 'Kongo Central',
    sponsor: 'World Bank / AfDB / DRC Government',
    sector: 'Hydropower / Mission 300',
    status: 'Feasibility',
    investmentNeed: 14000000000,
    description: 'Phase III development of the Grand Inga hydropower complex on the Congo River, targeting 11,050 MW generation capacity. Flagship project under the AfDB/World Bank Mission 300 initiative to connect 300 million Africans to electricity by 2030. Displaces fossil fuel generation across the Southern African Power Pool.',
    methodology: 'CDM ACM0002 (Grid-connected RE)',
    estimatedCredits: 42000000,
    startDate: '2029-Q1',
    duration: '50 years',
    contact: 'Inga III Development Authority, ADEPI',
    coordinates: '5.5°S, 13.6°E',
    cobenefits: ['Energy access for 65M people', 'Regional power trade', 'Industrial development', 'Mission 300 flagship'],
  },
  {
    id: 'PP-014',
    name: 'Mission 300 — Matadi-Kinshasa Solar Corridor',
    province: 'Kongo Central',
    sponsor: 'AfDB / USAID Power Africa / Equity BCDC',
    sector: 'Solar PV / Mission 300',
    status: 'Due Diligence',
    investmentNeed: 280000000,
    description: 'Deployment of 350 MW utility-scale solar PV across 6 sites along the Matadi-Kinshasa corridor, combined with 120 MWh battery storage. Part of Mission 300 distributed generation strategy targeting 2 million new grid connections in western DRC.',
    methodology: 'Gold Standard RE Methodology',
    estimatedCredits: 3800000,
    startDate: '2027-Q3',
    duration: '25 years',
    contact: 'Dr. Akinwumi Adesina, AfDB Mission 300 Unit',
    coordinates: '5.0°S, 14.5°E',
    cobenefits: ['2M new connections', 'Grid stabilisation', 'Job creation', 'Mission 300'],
  },
  {
    id: 'PP-015',
    name: 'Mission 300 — Eastern DRC Mini-grid Programme',
    province: 'Nord-Kivu',
    sponsor: 'AfDB / Nuru Energy / DFID',
    sector: 'Mini-grids / Mission 300',
    status: 'Approved',
    investmentNeed: 95000000,
    description: 'Rollout of 450 solar-hybrid mini-grids across Nord-Kivu, Sud-Kivu, and Ituri provinces, electrifying 800 rural communities and 350,000 households. Includes productive-use anchors (cold storage, milling, telecoms). Mission 300 rural electrification priority.',
    methodology: 'Gold Standard Micro-scale RE',
    estimatedCredits: 890000,
    startDate: '2027-Q1',
    duration: '20 years',
    contact: 'Jonathan Lehman, Nuru Energy',
    coordinates: '1.0°S, 29.2°E',
    cobenefits: ['Rural electrification', 'Productive use', 'Health facility power', 'Mission 300'],
  },
  {
    id: 'PP-016',
    name: 'Ruzizi IV Regional Hydropower',
    province: 'Sud-Kivu',
    sponsor: 'EGL / AfDB / EU',
    sector: 'Hydropower',
    status: 'Negotiation',
    investmentNeed: 625000000,
    description: 'Construction of 287 MW run-of-river hydropower plant on the Ruzizi River, shared between DRC, Rwanda, and Burundi. Designed as a regional power trade anchor under the Energy Community of the Great Lakes.',
    methodology: 'CDM ACM0002 (Grid-connected RE)',
    estimatedCredits: 5200000,
    startDate: '2028-Q2',
    duration: '40 years',
    contact: 'Alexis Kabuto, EGL Secretariat',
    coordinates: '2.7°S, 29.0°E',
    cobenefits: ['Regional integration', 'Energy trade', 'Industrial growth', 'Cross-border cooperation'],
  },
  {
    id: 'PP-017',
    name: 'Kinshasa Bus Rapid Transit Electrification',
    province: 'Kinshasa',
    sponsor: 'World Bank / Transco / JICA',
    sector: 'Transport / E-mobility',
    status: 'Feasibility',
    investmentNeed: 450000000,
    description: 'Electrification of Kinshasa\'s planned 3-corridor Bus Rapid Transit system with 250 electric buses, 12 charging depots powered by solar canopies, and 45 km of dedicated bus lanes. Displaces 18,000 polluting minibuses serving 1.2 million daily passengers.',
    methodology: 'CDM AM0031 (Bus rapid transit)',
    estimatedCredits: 680000,
    startDate: '2028-Q4',
    duration: '20 years',
    contact: 'Marie Tumba, Transco DRC',
    coordinates: '4.3°S, 15.3°E',
    cobenefits: ['Air quality', 'Traffic reduction', 'Urban mobility', 'Job creation'],
  },
  {
    id: 'PP-018',
    name: 'Kasumbalesa-Lubumbashi Freight Rail Modernisation',
    province: 'Haut-Katanga',
    sponsor: 'SNCC / IFC / Trafigura',
    sector: 'Transport / Rail',
    status: 'Concept',
    investmentNeed: 320000000,
    description: 'Modernisation and electrification of the 120 km Kasumbalesa-Lubumbashi freight rail corridor, shifting 8 million tonnes per year of copper/cobalt from diesel trucking to electric rail. Reduces fuel consumption by 85% on DRC\'s busiest mineral export route.',
    methodology: 'CDM AM0090 (Modal shift)',
    estimatedCredits: 1500000,
    startDate: '2029-Q2',
    duration: '30 years',
    contact: 'Pierre Kalala, SNCC',
    coordinates: '11.7°S, 27.5°E',
    cobenefits: ['Road safety', 'Mineral supply chain', 'Reduced truck emissions', 'Export efficiency'],
  },
  {
    id: 'PP-019',
    name: 'Matadi Port Green Shore Power',
    province: 'Kongo Central',
    sponsor: 'Bolloré Ports / DRC Maritime Authority',
    sector: 'Port Infrastructure / Energy',
    status: 'Due Diligence',
    investmentNeed: 85000000,
    description: 'Installation of shore power infrastructure at Matadi Port, enabling docked vessels to switch off diesel generators. Includes 25 MW solar array with battery storage, 4 shore power berths, and electrification of port handling equipment (cranes, forklifts, lighting).',
    methodology: 'CDM AMS-III.C',
    estimatedCredits: 320000,
    startDate: '2027-Q4',
    duration: '20 years',
    contact: 'François Mbala, Bolloré Ports DRC',
    coordinates: '5.8°S, 13.4°E',
    cobenefits: ['Air quality', 'Port modernisation', 'Energy efficiency', 'Maritime decarbonisation'],
  },
  {
    id: 'PP-020',
    name: 'Katanga Clean Copper Smelting Transition',
    province: 'Haut-Katanga',
    sponsor: 'Glencore / ERG / Green Hydrogen DRC',
    sector: 'Industrial Decarbonisation',
    status: 'Concept',
    investmentNeed: 540000000,
    description: 'Transition of 4 copper-cobalt smelters in the Katanga copper belt from coal/diesel to electric arc furnaces powered by hydro and green hydrogen. Targets 70% emissions reduction across smelting operations producing 400,000 tonnes copper annually.',
    methodology: 'CDM AM0058 (Industrial processes)',
    estimatedCredits: 2800000,
    startDate: '2029-Q3',
    duration: '25 years',
    contact: 'Dr. George Forrest, ERG Sustainability',
    coordinates: '10.9°S, 26.7°E',
    cobenefits: ['Responsible mining', 'Green metals', 'Worker health', 'Export competitiveness'],
  },
  {
    id: 'PP-021',
    name: 'Kisangani Waste-to-Energy Complex',
    province: 'Tshopo',
    sponsor: 'UNDP / GEF / City of Kisangani',
    sector: 'Waste Management / Energy',
    status: 'Validation',
    investmentNeed: 42000000,
    description: 'Integrated municipal solid waste management facility for Kisangani (population 1.6M) featuring anaerobic digestion of organic waste, landfill gas capture, and 8 MW power generation. Eliminates 3 open dump sites and provides waste collection for 400,000 households.',
    methodology: 'CDM ACM0001 (Landfill gas)',
    estimatedCredits: 560000,
    startDate: '2027-Q3',
    duration: '20 years',
    contact: 'Albert Moleka, UNDP DRC',
    coordinates: '0.5°N, 25.2°E',
    cobenefits: ['Waste management', 'Public health', 'Energy access', 'Urban sanitation'],
  },
  {
    id: 'PP-022',
    name: 'Congo River Navigation Modernisation',
    province: 'Équateur',
    sponsor: 'RVF / World Bank / EU',
    sector: 'Transport / Waterways',
    status: 'Feasibility',
    investmentNeed: 180000000,
    description: 'Modernisation of 1,734 km Kinshasa-Kisangani navigation corridor with solar-powered aids to navigation, 15 solar-electric river ports, and transition of 200 vessels from diesel to LNG/electric hybrid propulsion. The Congo River carries 70% of DRC\'s internal freight.',
    methodology: 'CDM AM0090 (Modal shift / fuel switch)',
    estimatedCredits: 720000,
    startDate: '2028-Q3',
    duration: '25 years',
    contact: 'Captain Mutombo, RVF',
    coordinates: '0.0°, 20.5°E',
    cobenefits: ['Trade connectivity', 'River safety', 'Fuel cost savings', 'Regional logistics'],
  },
  {
    id: 'PP-023',
    name: 'Mission 300 — Mbuji-Mayi Solar + Storage',
    province: 'Kasaï-Oriental',
    sponsor: 'AfDB / SNEL / Meridiam',
    sector: 'Solar PV / Mission 300',
    status: 'Due Diligence',
    investmentNeed: 125000000,
    description: 'Construction of 75 MW solar PV plant with 40 MWh lithium-ion storage serving Mbuji-Mayi (population 3.5M), the largest unelectrified city in Africa. Part of Mission 300 urban electrification priority targeting 500,000 new connections.',
    methodology: 'Gold Standard RE Methodology',
    estimatedCredits: 980000,
    startDate: '2027-Q4',
    duration: '25 years',
    contact: 'Thierry Déau, Meridiam Africa',
    coordinates: '6.1°S, 23.6°E',
    cobenefits: ['Energy access', 'Diamond sector power', 'Hospital electrification', 'Mission 300'],
  },
  {
    id: 'PP-024',
    name: 'Lubumbashi Green Data Centre',
    province: 'Haut-Katanga',
    sponsor: 'Africa Data Centres / Liquid Intelligent Technologies',
    sector: 'Digital Infrastructure',
    status: 'Negotiation',
    investmentNeed: 68000000,
    description: 'Construction of a Tier III, 10 MW green data centre in Lubumbashi powered by hydro and solar, with free-cooling optimised for the local climate. Anchors DRC\'s digital economy and reduces reliance on data centres in South Africa and Kenya.',
    methodology: 'Gold Standard Energy Efficiency',
    estimatedCredits: 180000,
    startDate: '2027-Q3',
    duration: '15 years',
    contact: 'Hardy Pemhiwa, Liquid Technologies',
    coordinates: '11.7°S, 27.5°E',
    cobenefits: ['Digital inclusion', 'Data sovereignty', 'Tech job creation', 'Cloud services'],
  },
  {
    id: 'PP-025',
    name: 'Banana Deep Water Port Green Terminal',
    province: 'Kongo Central',
    sponsor: 'DP World / DRC Government / AFESD',
    sector: 'Port Infrastructure',
    status: 'Feasibility',
    investmentNeed: 1200000000,
    description: 'Construction of DRC\'s first deep-water port at Banana on the Atlantic coast, designed as a zero-emission terminal with shore power, electric cranes, solar rooftops, and LNG bunkering. Eliminates DRC\'s dependency on Pointe-Noire (Congo) and Dar es Salaam (Tanzania) for ocean freight.',
    methodology: 'CDM AMS-III.C + RE',
    estimatedCredits: 850000,
    startDate: '2029-Q1',
    duration: '30 years',
    contact: 'Sultan Ahmed Bin Sulayem, DP World',
    coordinates: '6.0°S, 12.4°E',
    cobenefits: ['Trade sovereignty', 'Export diversification', 'Maritime jobs', 'Regional hub'],
  },
  {
    id: 'PP-026',
    name: 'Zongo II Hydropower Expansion',
    province: 'Kongo Central',
    sponsor: 'SNEL / Sinohydro / China Exim Bank',
    sector: 'Hydropower',
    status: 'Approved',
    investmentNeed: 360000000,
    description: 'Expansion of the existing Zongo I (75 MW) facility with a new 150 MW powerhouse on the Inkisi River, 130 km from Kinshasa. Provides dedicated baseload power for Kinshasa\'s industrial zones and reduces diesel generator dependency.',
    methodology: 'CDM ACM0002 (Grid-connected RE)',
    estimatedCredits: 2100000,
    startDate: '2027-Q2',
    duration: '40 years',
    contact: 'DG SNEL, Kinshasa',
    coordinates: '4.8°S, 14.9°E',
    cobenefits: ['Kinshasa power supply', 'Industrial growth', 'Grid stability'],
  },
  {
    id: 'PP-027',
    name: 'Kamoa-Kakula Mine Solar-Hydro Hybrid',
    province: 'Lualaba',
    sponsor: 'Ivanhoe Mines / Zijin Mining',
    sector: 'Mining Renewables',
    status: 'Negotiation',
    investmentNeed: 210000000,
    description: 'Construction of 100 MW solar PV and 78 MW run-of-river hydro to power the Kamoa-Kakula copper mine, the world\'s largest new copper discovery. Transitions the mine from grid/diesel to 85% renewable energy, establishing a model for green mining in the DRC.',
    methodology: 'Gold Standard Captive RE',
    estimatedCredits: 1400000,
    startDate: '2027-Q4',
    duration: '25 years',
    contact: 'Robert Friedland, Ivanhoe Mines',
    coordinates: '10.7°S, 25.3°E',
    cobenefits: ['Green copper certification', 'ESG compliance', 'Community power supply', 'Mining decarbonisation'],
  },
  {
    id: 'PP-028',
    name: 'Goma Geothermal Exploration',
    province: 'Nord-Kivu',
    sponsor: 'AU Commission / JICA / Virunga Foundation',
    sector: 'Geothermal Energy',
    status: 'Concept',
    investmentNeed: 75000000,
    description: 'Geothermal exploration and pilot drilling programme leveraging the volcanic activity of Mount Nyiragongo and Nyamulagira near Goma. Targets 50 MW initial capacity from the East African Rift geothermal resource, providing stable baseload power to Nord-Kivu.',
    methodology: 'CDM ACM0002 (Grid-connected RE)',
    estimatedCredits: 650000,
    startDate: '2029-Q1',
    duration: '30 years',
    contact: 'Dr. Katcho Karume, Goma Volcano Observatory',
    coordinates: '1.5°S, 29.2°E',
    cobenefits: ['Volcano monitoring', 'Baseload power', 'Disaster preparedness', 'Scientific research'],
  },
  {
    id: 'PP-029',
    name: 'Lobito Corridor — Kolwezi Rail Electrification (Lobito)',
    province: 'Lualaba',
    sponsor: 'US DFC / EU Global Gateway / AFC',
    sector: 'Rail Infrastructure (Lobito)',
    status: 'Due Diligence',
    investmentNeed: 550000000,
    description: 'Electrification and rehabilitation of the 400 km Kolwezi-Dilolo rail segment connecting DRC\'s copper-cobalt heartland to the Lobito Atlantic rail corridor via Angola. Enables 15 million tonnes annual mineral freight capacity, replacing diesel trucking on Africa\'s most critical mineral supply chain.',
    methodology: 'CDM AM0090 (Modal shift)',
    estimatedCredits: 3200000,
    startDate: '2028-Q1',
    duration: '30 years',
    contact: 'Lobito Corridor JV, US DFC Office',
    coordinates: '10.7°S, 25.5°E',
    cobenefits: ['Critical mineral supply chain', 'Trade corridor', 'Diesel displacement', 'Lobito Corridor'],
  },
  {
    id: 'PP-030',
    name: 'Lobito Corridor — Dilolo Border Logistics Hub (Lobito)',
    province: 'Lualaba',
    sponsor: 'Trafigura / Vecturis / EU Global Gateway',
    sector: 'Logistics Infrastructure (Lobito)',
    status: 'Negotiation',
    investmentNeed: 180000000,
    description: 'Construction of a multi-modal logistics hub at Dilolo, the DRC-Angola border crossing point on the Lobito Corridor. Includes a dry port, 30 MW solar array, bonded warehousing, customs processing centre, and rail-to-truck transfer yards. Reduces border crossing time from 14 days to 48 hours.',
    methodology: 'Gold Standard Energy Efficiency + RE',
    estimatedCredits: 280000,
    startDate: '2027-Q4',
    duration: '25 years',
    contact: 'Jeremy Weir, Trafigura',
    coordinates: '10.7°S, 22.3°E',
    cobenefits: ['Trade facilitation', 'Border efficiency', 'Solar power', 'Lobito Corridor'],
  },
  {
    id: 'PP-031',
    name: 'Lobito Corridor — Kamoa Copper Rail Spur (Lobito)',
    province: 'Lualaba',
    sponsor: 'Ivanhoe Mines / SNCC / Lobito JV',
    sector: 'Mining Rail (Lobito)',
    status: 'Approved',
    investmentNeed: 95000000,
    description: 'Construction of a 45 km electrified rail spur connecting the Kamoa-Kakula copper complex directly to the Lobito Corridor mainline, eliminating 850 diesel truck trips per day. Includes a copper concentrate loading terminal with solar-powered conveyor systems.',
    methodology: 'CDM AM0090 (Modal shift)',
    estimatedCredits: 420000,
    startDate: '2027-Q2',
    duration: '25 years',
    contact: 'Robert Friedland, Ivanhoe Mines',
    coordinates: '10.8°S, 25.3°E',
    cobenefits: ['Mine-to-port efficiency', 'Road safety', 'Diesel elimination', 'Lobito Corridor'],
  },
  {
    id: 'PP-032',
    name: 'Lobito Corridor — Katanga Renewable Energy Corridor (Lobito)',
    province: 'Haut-Katanga',
    sponsor: 'US DFC / SNEL / Sun Africa',
    sector: 'Solar + Storage (Lobito)',
    status: 'Feasibility',
    investmentNeed: 340000000,
    description: 'Deployment of 200 MW solar PV with 150 MWh battery storage across 4 sites along the Lobito Corridor rail route in Katanga, providing dedicated clean power for rail operations, mining, and adjacent communities. Includes 50,000 new household connections.',
    methodology: 'Gold Standard RE Methodology',
    estimatedCredits: 2600000,
    startDate: '2028-Q2',
    duration: '25 years',
    contact: 'Andrew Herscowitz, US DFC Africa',
    coordinates: '11.0°S, 27.0°E',
    cobenefits: ['Rail decarbonisation', 'Mining power', 'Community electrification', 'Lobito Corridor'],
  },
  {
    id: 'PP-033',
    name: 'Lobito Corridor — Fungurume Processing Zone (Lobito)',
    province: 'Lualaba',
    sponsor: 'CMOC / DRC Government / AfDB',
    sector: 'Industrial Zone (Lobito)',
    status: 'Concept',
    investmentNeed: 420000000,
    description: 'Development of a Special Economic Zone at Fungurume for copper-cobalt processing, battery precursor manufacturing, and value addition along the Lobito Corridor. Includes 120 MW captive solar, green hydrogen pilot for cobalt refining, and effluent treatment.',
    methodology: 'CDM AM0058 (Industrial) + RE',
    estimatedCredits: 1800000,
    startDate: '2029-Q2',
    duration: '30 years',
    contact: 'DRC Investment Promotion Agency (ANAPI)',
    coordinates: '10.5°S, 26.3°E',
    cobenefits: ['Value addition', 'Battery supply chain', 'Green industrialisation', 'Lobito Corridor'],
  },
  {
    id: 'PP-034',
    name: 'Lobito Corridor — Tenke Digital Fibre Backbone (Lobito)',
    province: 'Lualaba',
    sponsor: 'Liquid Technologies / Google / US DFC',
    sector: 'Digital Infrastructure (Lobito)',
    status: 'Due Diligence',
    investmentNeed: 65000000,
    description: 'Installation of 1,200 km fibre-optic cable along the Lobito rail corridor right-of-way from Kolwezi to the Angola border, connecting to the 2Africa subsea cable at Lobito port. Provides high-speed connectivity for mining operations, logistics tracking, and 3 million people in corridor towns.',
    methodology: 'Gold Standard Energy Efficiency',
    estimatedCredits: 85000,
    startDate: '2027-Q3',
    duration: '20 years',
    contact: 'Hardy Pemhiwa, Liquid Technologies',
    coordinates: '10.6°S, 25.6°E',
    cobenefits: ['Digital inclusion', 'Mining digitalisation', 'Corridor connectivity', 'Lobito Corridor'],
  },
];

function formatUSD(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export default function PipelinePage() {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState<PipelineProject | null>(null);

  const sectors = ['All', ...new Set(projects.map((p) => p.sector))];
  const statuses = ['All', ...new Set(projects.map((p) => p.status))];

  const filtered = projects.filter((p) => {
    if (sectorFilter !== 'All' && p.sector !== sectorFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.province.toLowerCase().includes(q) ||
        p.sponsor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInvestment = filtered.reduce((s, p) => s + p.investmentNeed, 0);
  const totalCredits = filtered.reduce((s, p) => s + p.estimatedCredits, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text,var(--foreground))]">Prospective Pipeline</h1>
        <p className="text-sm text-[var(--text-muted,var(--foreground-muted))] mt-1">
          Carbon project investment opportunities across the DRC
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <p className="text-xs font-medium text-[var(--foreground-muted)]">Total Projects</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{filtered.length}</p>
          <p className="text-xs text-[var(--foreground-subtle)] mt-1">of {projects.length} in pipeline</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <p className="text-xs font-medium text-[var(--foreground-muted)]">Total Investment Need</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{formatUSD(totalInvestment)}</p>
          <p className="text-xs text-[var(--foreground-subtle)] mt-1">across all filtered projects</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <p className="text-xs font-medium text-[var(--foreground-muted)]">Est. Carbon Credits</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{(totalCredits / 1_000_000).toFixed(1)}M</p>
          <p className="text-xs text-[var(--foreground-subtle)] mt-1">tCO2e over project lifetimes</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <p className="text-xs font-medium text-[var(--foreground-muted)]">Sectors Covered</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{new Set(filtered.map(p => p.sector)).size}</p>
          <p className="text-xs text-[var(--foreground-subtle)] mt-1">project types</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--foreground)]"
          />
        </div>
        <div className="relative">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Sectors' : s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)] pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)] pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Project Name', 'Province', 'Sponsor', 'Sector', 'Status', 'Investment Need', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-secondary)] transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-[var(--foreground)]">{p.name}</div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-0.5">{p.id}</div>
                  </td>
                  <td className="px-5 py-3 text-[var(--foreground)]">{p.province}</td>
                  <td className="px-5 py-3 text-[var(--foreground)]">{p.sponsor}</td>
                  <td className="px-5 py-3 text-[var(--foreground-muted)] text-xs">{p.sector}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3 font-mono font-medium text-[var(--foreground)] tabular-nums">{formatUSD(p.investmentNeed)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setSelected(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      Details
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--foreground-subtle)] text-sm">
            No projects match your filters.
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog header */}
            <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 flex items-start justify-between z-10">
              <div>
                <p className="text-xs font-mono text-[var(--foreground-subtle)]">{selected.id}</p>
                <h2 className="text-lg font-bold text-[var(--foreground)] mt-1">{selected.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={selected.status} />
                  <span className="text-xs text-[var(--foreground-muted)]">{selected.sector}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--surface-secondary)] text-[var(--foreground-muted)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dialog body */}
            <div className="px-6 py-5 space-y-5">
              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2">Project Description</h3>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{selected.description}</p>
              </div>

              {/* Key metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--foreground-muted)]">Investment Need</span>
                  </div>
                  <p className="text-xl font-bold text-[var(--foreground)]">{formatUSD(selected.investmentNeed)}</p>
                </div>
                <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--foreground-muted)]">Est. Credits</span>
                  </div>
                  <p className="text-xl font-bold text-[var(--foreground)]">{(selected.estimatedCredits / 1_000_000).toFixed(1)}M tCO2e</p>
                </div>
                <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--foreground-muted)]">Timeline</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{selected.startDate}</p>
                  <p className="text-xs text-[var(--foreground-subtle)]">{selected.duration}</p>
                </div>
                <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--foreground-muted)]">Location</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{selected.province}</p>
                  <p className="text-xs text-[var(--foreground-subtle)]">{selected.coordinates}</p>
                </div>
              </div>

              {/* Details list */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-[var(--foreground-muted)] w-28 shrink-0 pt-0.5">Methodology</span>
                  <span className="text-sm text-[var(--foreground)]">{selected.methodology}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-[var(--foreground-muted)] w-28 shrink-0 pt-0.5">Sponsor</span>
                  <span className="text-sm text-[var(--foreground)]">{selected.sponsor}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-[var(--foreground-muted)] w-28 shrink-0 pt-0.5">Contact</span>
                  <span className="text-sm text-[var(--foreground)]">{selected.contact}</span>
                </div>
              </div>

              {/* Co-benefits */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2">Co-benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.cobenefits.map((cb) => (
                    <span key={cb} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--accent-light)] text-[var(--accent)]">
                      {cb}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dialog footer */}
            <div className="sticky bottom-0 bg-[var(--surface)] border-t border-[var(--border)] px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors">
                Request Investment Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
