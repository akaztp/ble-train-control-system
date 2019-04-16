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
- Switch Left: Straight | Left, (0,-1:1,1)
- Switch Right: Straight | Right, (0,0:1,2)
- Signal Light: Green | Red, (0,0:1,1)
- Train Presence: On | Off, (0,0:1,1)

## Layout Descriptor
- ID
- PlacedPrimitive[]

## PlacedPrimitive
- ID
- FromPos: x, y
- ToPos: x, y
- Rotation: 0 | 90 | 180 | 270
- PrimitiveID
- DataID
- SegmentID
