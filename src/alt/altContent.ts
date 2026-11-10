import { getInsights } from '../lib/wp'
import thumbProperty from './thumbs/property.webp'
import thumbEmployment from './thumbs/employment.webp'
import thumbSuccession from './thumbs/succession.webp'
import thumbLitigation from './thumbs/litigation.webp'
import thumbBanking from './thumbs/banking.webp'
import thumbCriminal from './thumbs/criminal.webp'

// Placeholder articles for the /alt design. Thumbnails are crops of the hero scene, to be swapped for real photos. Replace with real posts from WordPress;
// when VITE_WP_URL is set, loadPosts() returns the live posts instead.
export interface AltPost {
  slug: string
  tag: string
  title: string
  excerpt?: string
  date: string
  read?: string
  // Optional real thumbnail (import path or URL). Without one the card shows a topic tile.
  thumb?: string
  // Full article text. Posts without a body are listed but not linked.
  body?: { h?: string; p: string[] }[]
}

export const altInsights: AltPost[] = [
  {
    slug: 'before-you-buy-land',
    thumb: thumbProperty,
    tag: 'Property',
    title: 'What to check before you buy land in Nairobi',
    excerpt: 'Title searches, rates clearance and consents: a short checklist to work through before you sign a sale agreement.',
    date: '28 Oct 2026',
    read: '6 min read',
    body: [
      {
        p: [
          'Buying land is usually the largest purchase a person or a business makes, and the paperwork behind it is where most disputes start. This checklist covers the checks we ask clients to complete before a sale agreement is signed or any deposit is paid.',
        ],
      },
      {
        h: '1. Confirm who owns the land',
        p: [
          "Start with an official search at the lands registry. The search shows the registered owner, the type of title and the size of the plot, and it should match the seller's name and identity documents exactly.",
          'If the seller is acting for someone else, ask for a power of attorney and check that it is properly executed and, where required, registered. If the seller is a company, check its registration and the resolution authorising the sale.',
        ],
      },
      {
        h: '2. Look for encumbrances',
        p: [
          'The same search shows whether the land is charged to a bank, subject to a caveat or restriction, or tied up in a court case. Any of these can stop a transfer or leave you inheriting the seller\'s problem. Ask the seller to clear them before completion and to confirm that in writing.',
        ],
      },
      {
        h: '3. Check the land on the ground',
        p: [
          'Visit the plot with the seller and, where possible, a surveyor. Confirm the boundaries and beacons against the registry map or deed plan, and note who is in occupation. Occupiers, informal structures and access disputes with neighbours are far easier to deal with before you buy than after.',
        ],
      },
      {
        h: '4. Clear rates, rent and other dues',
        p: [
          'Ask for evidence that county rates and, for leasehold land, ground rent are paid up to date. Clearance certificates are usually needed to complete a transfer, and unpaid arrears can become your problem in practice.',
        ],
      },
      {
        h: '5. Ask whether any consents are needed',
        p: [
          'Some transactions need consent before they can be registered, for example where the land is agricultural and falls under a Land Control Board, or where a lease requires the lessor\'s approval. Find out early, because consents take time and have to be sought within the period the law allows.',
        ],
      },
      {
        h: '6. Put it in a proper sale agreement',
        p: [
          'A written agreement should name the parties, describe the land by its title number, state the price and payment schedule, set the completion date and say what happens if either side defaults. Pay deposits into an advocate\'s client account rather than directly to the seller, so the money is protected until the conditions are met.',
        ],
      },
      {
        h: '7. Budget for the transfer costs',
        p: [
          'Stamp duty, legal fees, valuation and registration costs are paid on top of the price. Ask your advocate for an estimate before you commit, so there are no surprises at completion.',
        ],
      },
      {
        h: 'When to speak to an advocate',
        p: [
          'Ideally before you pay a deposit. An advocate can run the searches, review the title documents and draft or review the agreement, which usually costs far less than resolving a dispute later.',
        ],
      },
    ],
  },
  {
    slug: 'termination-and-your-rights',
    thumb: thumbEmployment,
    tag: 'Employment',
    title: 'Termination and your rights at work',
    excerpt: 'What a fair termination looks like, and what to do if you think yours was not.',
    date: '14 Oct 2026',
    read: '5 min read',
  },
  {
    slug: 'grant-of-representation',
    thumb: thumbSuccession,
    tag: 'Succession',
    title: 'Applying for a grant of representation',
    excerpt: 'The documents you need, how the court process runs, and the common reasons an application stalls.',
    date: '30 Sep 2026',
    read: '7 min read',
  },
  {
    slug: 'recovering-a-commercial-debt',
    thumb: thumbLitigation,
    tag: 'Litigation',
    title: 'Recovering a commercial debt, from demand to judgment',
    excerpt: 'The steps between a first demand letter and an enforceable judgment, and where businesses lose time.',
    date: '16 Sep 2026',
    read: '6 min read',
  },
  {
    slug: 'documenting-security',
    thumb: thumbBanking,
    tag: 'Banking',
    title: 'What a lender should document when taking security',
    excerpt: 'Charges, guarantees and consents: the paperwork that decides whether security can be enforced later.',
    date: '2 Sep 2026',
    read: '5 min read',
  },
  {
    slug: 'your-rights-on-arrest',
    thumb: thumbCriminal,
    tag: 'Criminal',
    title: 'Your rights on arrest, and when to call an advocate',
    excerpt: 'What the police may and may not do, how bail and bond work, and why early advice matters.',
    date: '19 Aug 2026',
    read: '4 min read',
  },
]

export async function loadPosts(): Promise<AltPost[]> {
  return import.meta.env.VITE_WP_URL ? getInsights() : altInsights
}

export const getPost = (posts: AltPost[], slug: string) => posts.find((p) => p.slug === slug)

export const folio = (i: number) => String(i + 1).padStart(2, '0')

export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Kenyatta+University+Plaza+Haile+Selassie+Avenue+Nairobi'

export const mapEmbed = 'https://www.google.com/maps?q=Kenyatta+University+Plaza,+Haile+Selassie+Avenue,+Nairobi&output=embed'
