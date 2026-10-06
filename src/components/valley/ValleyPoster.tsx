import { buildArchitecture, type Finish } from './still-architecture'
import { STOPS } from './journey-math'
import { daylightPalette, forestPalette } from './still-palette'
import ArrivalPoster from './ArrivalPoster'

const architecture = buildArchitecture()
/** A code-native still from the same authored masonry, available before WebGL. */
export default function ValleyPoster({ dark, active = 0, compact = false }: { dark: boolean; active?: number; compact?: boolean }) {
  if (active === 0) return <ArrivalPoster dark={dark} compact={compact} />
  const focus = STOPS[Math.min(6, active)]
  const right = active !== 2 && active !== 4
  const origin = compact ? 400 : right ? 555 : 240
  const palette: Record<Finish, string> = dark ? forestPalette : daylightPalette
  const project = (x: number, y: number, z: number) => [origin + ((x - focus[0]) - (z - focus[2])) * 30, 320 + ((x - focus[0]) + (z - focus[2])) * 17.32 - (y - focus[1] + 1) * 34.64]
  const poly = (points: number[][]) => points.map(p => p.join(',')).join(' ')
  const solids = architecture.solids.filter(({ at }) => Math.hypot(at[0] - focus[0], at[2] - focus[2]) < 8).sort((a, b) => a.at[0] + a.at[2] + a.at[1] - b.at[0] - b.at[2] - b.at[1])
  return <svg viewBox="0 0 800 540" role="presentation" aria-hidden="true">
    {solids.map(({ at: [x, y, z], size: [w, h, d], finish }, i) => {
      const points = [[x-w/2,z-d/2],[x+w/2,z-d/2],[x+w/2,z+d/2],[x-w/2,z+d/2]]
      const top = points.map(([a,b])=>project(a,y+h/2,b)), bottom = points.map(([a,b])=>project(a,y-h/2,b))
      return <g key={i} fill={palette[finish]}>
        <polygon points={poly([top[1],top[2],bottom[2],bottom[1]])} />
        <polygon points={poly([top[1],top[2],bottom[2],bottom[1]])} fill={dark ? '#426d80' : palette.deep} opacity=".18" />
        <polygon points={poly([top[2],top[3],bottom[3],bottom[2]])} />
        <polygon points={poly(top)} />
        <polygon points={poly(top)} fill="#ffffff" opacity=".13" />
      </g>
    })}
    {architecture.plants.filter(({at})=>Math.hypot(at[0]-focus[0],at[2]-focus[2])<7).map(({at,size,flower},i)=>{
      const [x,y]=project(...at)
      return <g key={i} transform={`translate(${x} ${y}) scale(${size})`}>
        <path d="M0 0V-30" stroke="#ae956d" strokeWidth="2" />
        {flower ? <path d="M-14-20C-26-27-17-39-9-38C-11-52 5-54 11-43C25-45 28-28 16-24C12-15 0-18-4-21C-8-15-14-15-14-20Z" fill={palette.pink}/> : dark ? <g fill={palette.deep}><path d="M0-28C-9-47-23-48-30-28C-18-35-8-33 0-28ZM0-28C7-49 25-43 29-24C18-32 8-33 0-28ZM0-28C-4-50 5-58 10-59C6-42 4-36 0-28Z"/></g> : <path d="M0-10C-17-14-12-42 2-77C11-50 19-17 0-10Z" fill={palette.deep}/>}
      </g>
    })}
  </svg>
}
