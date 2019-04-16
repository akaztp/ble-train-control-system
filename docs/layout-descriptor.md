# Layout Descriptors

These are the structures for describing a track layout graphically.
It uses a integer coordinate system (grid):
- Origin at the top left corner 
- Only one primitive in each grid point, except for Signal Light and Presence
- Primitive SVG graphic is centered in square (0,0:1,1)
- Positioning SVG origin: center of primitive (0.5,0.5)

## Primitives: (footprint)
- Straight: (0,0:1,1)
- Diagonal: (0,0:1,1)
- Switch Left, Straight: (0,-1:1,1)
- Switch Left, Left: (0,-1:1,1)
- Switch Right, Straight: (0,0:1,2)
- Switch Right, Right: (0,0:1,2)
- Signal Light, Green: (0,0:1,1)
- Signal Light, Red: (0,0:1,1)
- Train Presence, on: (0,0:1,1)
- Train Presence, off: (0,0:1,1)

## Layout Descriptor
- ID
- PlacedPrimitive[]

## PlacedPrimitive
- ID
- FromPos: x, y
- ToPos: x, y
- Primitive
- Rotation: 0 | 90 | 180 | 270
