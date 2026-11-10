// All copy comes from the firm profile. When WordPress goes live, each export
// below maps to a WP post type / ACF options page (see src/lib/wp.ts).

export const firm = {
  name: 'Rongoma Janji & Associates Advocates',
  short: 'RJA',
  address: ['Kenyatta University (K.U) Plaza, 5th Floor, Suite 521', 'Haile Selassie Avenue, Nairobi CBD', 'P.O. Box 3150-00100, Nairobi'],
  email: 'janjirongomalaw@gmail.com',
  phones: ['0705 142 268', '0791 903 792'],
  intro: [
    "Rongoma Janji & Associates Advocates (RJA) is a medium-sized law firm in Nairobi's Central Business District, founded on professionalism, integrity, inclusiveness and excellence.",
    'A dynamic team of young, dedicated and forward-thinking practitioners provides practical, innovative and high-quality legal solutions tailored to a diverse clientele.',
    'Our client-centred approach rests on partnership, transparency and dedicated service, so that every client receives attentive, responsive and effective representation.',
  ],
  vision:
    'To be a leading provider of innovative, reliable and high-quality legal services to corporate entities, institutions and individuals across East Africa, distinguished by professional excellence, integrity and client satisfaction.',
  mission:
    "To provide exceptional legal services through diligent and strategic legal representation, sound legal counsel and unwavering commitment to our clients' interests, while upholding the highest standards of professionalism, integrity and ethical conduct.",
  principle:
    'To uphold excellence, integrity and professionalism in every aspect of our practice, fostering a collaborative working environment founded on teamwork and a lasting tradition of leadership, innovation and dedicated service.',
  values: ['Professionalism', 'Integrity', 'Inclusiveness', 'Excellence'],
  infrastructure:
    'Reliable connectivity, modern legal research tools and a well-stocked legal research library let us research thoroughly and respond quickly.',
}

export interface PracticeArea {
  slug: string
  title: string
  summary: string
  detail: string
  services: string[]
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'conveyancing-property-law',
    title: 'Conveyancing & Property Law',
    summary: 'Buying, selling, developing, leasing and financing commercial, industrial and residential property.',
    detail:
      'We act for corporate entities and private individuals who want to buy, sell, develop, lease or invest in property, and represent clients in litigation arising from property transactions.',
    services: ['Legal due diligence and title searches', 'Transfers, leases, charges and mortgages', 'Property financing and security documentation', 'Debt recovery and ownership disputes'],
  },
  {
    slug: 'environmental-land-law',
    title: 'Environmental & Land Law',
    summary: 'Land ownership disputes, compulsory acquisition and enforcement of proprietary rights.',
    detail:
      'We advise and represent individuals, companies and developers in environmental and land matters before the Environment and Land Court and other judicial and quasi-judicial forums.',
    services: ['Land ownership and title disputes', 'Boundary disputes and adverse possession', 'Compulsory acquisition', 'Land transactions and enforcement of proprietary rights'],
  },
  {
    slug: 'criminal-law-defence',
    title: 'Criminal Law & Defence',
    summary: 'Robust, strategic defence at every stage, from police investigation to appeal.',
    detail:
      'We represent individuals and corporate entities at all stages of criminal proceedings, safeguarding constitutional rights and ensuring due process.',
    services: ['Fraud, forgery, money laundering and economic crimes', 'Corruption and cybercrime', 'Arrest, bail and bond applications', 'Plea negotiations, trials, appeals and revisions'],
  },
  {
    slug: 'business-corporate-law',
    title: 'Business & Corporate Law',
    summary: 'Company formation, governance, transactions and ongoing commercial advice.',
    detail:
      'We serve companies, financial institutions, insurers, telecommunications and energy players, partnerships and entrepreneurs with corporate and commercial legal services.',
    services: ['Company formation, registration and licensing', 'Mergers, acquisitions and corporate finance', 'Regulatory compliance and governance', 'Drafting and negotiating commercial contracts'],
  },
  {
    slug: 'commercial-litigation-debt-recovery',
    title: 'Commercial Litigation & Debt Recovery',
    summary: 'Debt recovery, distress for rent and receivership for businesses and lenders.',
    detail:
      'RJA is principally a commercial litigation firm. We advise on refinancing, restructuring and realising debts, and on commercial disputes including contentious intellectual property and regulatory matters.',
    services: ['Debt recovery', 'Distress for rent', 'Receivership', 'Intellectual property and regulatory litigation'],
  },
  {
    slug: 'employment-labour-law',
    title: 'Employment & Labour Law',
    summary: 'Advice and representation for employers and employees alike.',
    detail:
      'We act for both employers and employees before the Employment and Labour Relations Court and other tribunals, protecting rights and ensuring compliance with labour law.',
    services: ['Employment contracts and workplace policies', 'Disciplinary proceedings, termination and dismissal', 'Redundancy and workplace disputes', 'Statutory employment obligations'],
  },
  {
    slug: 'election-law',
    title: 'Election Law',
    summary: 'Electoral advice and dispute resolution for candidates, parties and voters.',
    detail:
      'We represent candidates, political parties, voters and other stakeholders before the IEBC, the Political Parties Disputes Tribunal and the courts.',
    services: ['Nomination disputes', 'Election petitions', 'Election offences', 'Disputes on the conduct and management of elections'],
  },
  {
    slug: 'insurance-litigation',
    title: 'Insurance Litigation',
    summary: 'Claims, coverage and indemnity disputes for insurers and other stakeholders.',
    detail:
      'We handle a wide range of insurance claims and advise on policy interpretation, claims assessment and settlement, representing clients in court and other dispute forums.',
    services: ['Motor vehicle accident and personal injury claims', "Employer's and public liability", 'Professional indemnity and material damage', 'Coverage, indemnity and policy disputes'],
  },
  {
    slug: 'banking-law-finance',
    title: 'Banking Law & Finance',
    summary: 'Lending, security and banking disputes for lenders and borrowers.',
    detail:
      'We provide advisory, transactional and litigation services to banks, financial institutions, lenders and individuals.',
    services: ['Secured and unsecured lending, syndicated facilities', 'Corporate, trade and property finance', 'Security instruments, mortgages, charges and guarantees', 'Enforcement of securities and unlawful account debits'],
  },
  {
    slug: 'probate-administration',
    title: 'Probate & Administration',
    summary: 'Grants of representation, estate distribution and succession disputes.',
    detail:
      'We advise executors, administrators and beneficiaries on testate and intestate estates, and handle contentious succession proceedings.',
    services: ['Grants of representation and confirmation', 'Estate distribution and inheritance claims', 'Objections, revocation and annulment of grants', 'Disputes over estate property'],
  },
]

export const founder = {
  name: 'Billy Rongoma Janji',
  role: 'Founder & Managing Partner',
  credential: 'Advocate of the High Court of Kenya',
  bio: [
    'Billy holds a Bachelor of Laws (First Class Honours) from the Catholic University of Eastern Africa, graduating in 2015, and completed the Advocates Training Programme at the Kenya School of Law.',
    'He practised at Musyoki Mogaka & Company Advocates from 2019 to 2021 and at Kemboy Law Advocates from December 2021 to December 2023, before founding RJA.',
    "His approach pairs rigorous research and effective advocacy with strategic thinking, commercial awareness and attention to each client's objectives.",
  ],
  experience: [
    'Civil litigation and dispute resolution',
    'Criminal law and defence',
    'Employment and labour relations',
    'Conveyancing and property law',
    'Environmental and land litigation',
    'Personal injury and accident claims',
    'Banking law and finance',
    'Business and corporate law',
    'Election law',
    'Debt recovery and collection',
    'Insurance law and litigation',
    'Probate, succession and estate administration',
    'Family law',
    'Constitutional law and litigation',
  ],
}

// Client names are confidential, so the site shows sectors instead.
export const sectors = [
  'Education',
  'Logistics & cargo',
  'Healthcare & medical supplies',
  'Travel & tourism',
  'Hospitality',
  'Manufacturing & industry',
  'Banking & finance',
  'Insurance',
  'Telecommunications & energy',
  'Community groups',
  'Private individuals',
  'Entrepreneurs',
]


export const maps = {
  link: 'https://www.google.com/maps/search/?api=1&query=Kenyatta+University+Plaza+Haile+Selassie+Avenue+Nairobi',
  embed: 'https://www.google.com/maps?q=Kenyatta+University+Plaza,+Haile+Selassie+Avenue,+Nairobi&output=embed',
}
