export interface SoundtrackTrack {
  title: string
  artist: string
  /** Seconds, measured from the encoded file so segments can be planned before it loads. */
  duration: number
  src: string
  credit?: string
}

const pixabay = (user: string, id: number) =>
  `https://pixabay.com/users/${user}/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=${id}`

export const soundtrack: SoundtrackTrack[] = [
  { title: 'Piano Nocturne', artist: 'WELC0MEИ0', duration: 186.2, src: '/audio/piano-nocturne.m4a', credit: pixabay('welc0me%D0%B80-12042425', 155649) },
  { title: 'So Close', artist: 'Karandeep Singh', duration: 149.9, src: '/audio/so-close.m4a' },
  { title: 'Step Into Serenity', artist: 'John Tramp', duration: 240, src: '/audio/step-into-serenity.m4a', credit: pixabay('tramp963-3529620', 269777) },
  { title: 'A Long Way', artist: 'Sergii Pavkin', duration: 273, src: '/audio/a-long-way.m4a', credit: pixabay('sergepavkinmusic-6130722', 166385) },
  { title: 'Short Peaceful Lo-fi', artist: 'Mr. Montogoronto', duration: 14.8, src: '/audio/short-peaceful-lofi.m4a', credit: pixabay('montogoronto-34345685', 346150) },
]
