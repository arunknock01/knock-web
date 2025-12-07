import { SectionData, NavItem } from './types';

export const APP_NAME = "Knock";
export const DOC_VERSION = "Beta 1.0";

export const NAV_ITEMS: NavItem[] = [
  { id: 'mission', label: '01. Mission' },
  { id: 'interaction', label: '02. The Knock' },
  { id: 'radar', label: '03. Radar' },
  { id: 'privacy', label: '04. Privacy' },
  { id: 'interface', label: '05. Interface' },
  { id: 'identity', label: '06. Identity' },
];

export const SECTIONS: SectionData[] = [
  {
    id: 'mission',
    title: 'Real World, Real Time',
    subtitle: 'The Mission',
    content: [
      'We live in a hyper-connected world, yet we have never been lonelier. Knock is the antidote to doom-scrolling. It is a tool for spontaneous, real-world connection.',
      'Open an "Event Seat" when you are grabbing coffee, studying, or just hanging out. Let others nearby know you are open to company. No scheduling, no swiping—just presence.'
    ],
    listItems: [
      'Spontaneous meetups',
      'Hyper-local radius',
      'Authentic human connection',
      'Zero doom-scrolling'
    ],
    visualType: 'none'
  },
  {
    id: 'interaction',
    title: 'Just Knock to Enter',
    subtitle: 'The Core Interaction',
    content: [
      'The "Knock" is our fundamental unit of interaction. It is a polite, digital request to enter someone\'s physical space. ',
      'When you see someone nearby who is open to company, you don\'t slide into DMs. You simply Knock. A subtle pulse on their device lets them know someone is interested. They choose to open the door, or stay focused.'
    ],
    visualType: 'portal'
  },
  {
    id: 'radar',
    title: 'Find Your Frequency',
    subtitle: 'The Radar',
    content: [
      'Our proximity engine works in the background to find people on your wavelength. The Radar doesn\'t show exact locations for safety; instead, it shows "Fields of Presence".',
      'You see who is nearby, what their current vibe is (e.g., "Deep Focus", "Casual Chat", "Board Games"), and how close they are.'
    ],
    visualType: 'grid'
  },
  {
    id: 'privacy',
    title: 'Presence, Not Exposure',
    subtitle: 'Privacy & Safety',
    content: [
      'You are anonymous until you decide not to be. We believe in "Progressive Disclosure". Your profile photo and full details are only revealed once a Knock is accepted.',
      'Safety is built into the foundation. Public spaces only. Verified identities. You have complete control over who crosses the threshold.'
    ],
    visualType: 'color'
  },
  {
    id: 'interface',
    title: 'Quiet by Design',
    subtitle: 'The Interface',
    content: [
      'Knock is designed to be invisible. No red dots, no addictive loops, no gamification. The interface uses a strict black-and-white palette to reduce cognitive load.',
      'We use typography and negative space to communicate, keeping your focus on the person in front of you, not the screen.'
    ],
    visualType: 'typography'
  },
  {
    id: 'identity',
    title: 'The Symbol',
    subtitle: 'App Icon',
    content: [
      'Our identity is anchored by the "k"—a character that represents the spark of contact. Constructed from pure geometric primitives, it balances the rigidity of technology with human approachability.',
      'The vertical pillar represents you, while the chevron represents the door opening to new connections. Look for the black tile on your home screen.'
    ],
    visualType: 'icon'
  }
];