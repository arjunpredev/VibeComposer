export interface StrudelExample {
	name: string;
	code: string;
	by?: string;
}

export const STRUDEL_EXAMPLES: StrudelExample[] = [
	{
		name: "dante as synth",
		by: "Arjun Raj Jain",
		code: `// dante as synth - Originally Vibe Composed by @ArjunRajJain

setcps(0.5)
stack(
  
  s("hh*4").gain(sine.range(.2,.4))
  .delay(.2).delaytime(.16).delayfeedback(.3),
  
  s("cp(3,8,[0.5 0.7])").gain(.5).room(.4)
  .sometimes(fast(2)),
  
  note("a2 [~ d2] g2 [~ e2]")
  .s("sine")
  .gain(.6)
  .cutoff(300)
  .shape(.1)
  .attack(.1),
  
  note("a4,c5 [~ d5,f5] g4,b4 [~ e5,g5]")
  .s("square")
  .lpf(400)
  .attack(.2)
  .sustain(.1)
  .gain(.15)
  .room(.8)
  .slow(8)
  .echo(4,.16,.4),
)`,
	},
	{
		name: "Amensister",
		by: "Felix Roos",
		code: `// "Amensister"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples('github:tidalcycles/dirt-samples')

stack(
  // amen
  n("0 1 2 3 4 5 6 7")
  .sometimes(x=>x.ply(2))
  .rarely(x=>x.speed("2 | -2"))
  .sometimesBy(.4, x=>x.delay(".5"))
  .s("amencutup")
  .slow(2)
  .room(.5)
  ,
  // bass
  sine.add(saw.slow(4)).range(0,7).segment(8)
  .superimpose(x=>x.add(.1))
  .scale('G0 minor').note()
  .s("sawtooth")
  .gain(.4).decay(.1).sustain(0)
  .lpa(.1).lpenv(-4).lpq(10)
  .cutoff(perlin.range(300,3000).slow(8))
  .degradeBy("0 0.1 .5 .1")
  .rarely(add(note("12")))
  ,
  // chord
  note("Bb3,D4".superimpose(x=>x.add(.2)))
  .s('sawtooth').lpf(1000).struct("<~@3 [~ x]>")
  .decay(.05).sustain(.0).delay(.8).delaytime(.125).room(.8)
  ,
  // alien
  s("breath").room(1).shape(.6).chop(16).rev().mask("<x ~@7>")
  ,
  n("0 1").s("east").delay(.5).degradeBy(.8).speed(rand.range(.5,1.5))
).reset("<x@7 x(5,8,-1)>")`,
	},
	{
		name: "Arpoon",
		by: "Felix Roos",
		code: `// "Arpoon"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples('github:tidalcycles/dirt-samples')

n("[0,3] 2 [1,3] 2".fast(3).lastOf(4, fast(2))).clip(2)
  .offset("<<1 2> 2 1 1>")
  .chord("<<Am7 C^7> C7 F^7 [Fm7 E7b9]>")
  .dict('lefthand').voicing()
  .add(perlin.range(0,0.2).add("<-12 0>/8").note())
  .cutoff(perlin.range(500,4000)).resonance(12)
  .gain("<.5 .8>*16")
  .decay(.16).sustain(0.5)
  .delay(.2)
  .room(.5).pan(sine.range(.3,.6))
  .s('piano')
  .stack(
    "<<A1 C2>!2 F2 F2>"
    .add.out("0 -5".fast(2))
    .add("0,.12").note()
    .s('sawtooth').cutoff(180)
    .lpa(.1).lpenv(2)
  )
  .slow(4)
  .stack(s("bd*4, [~ [hh hh? hh?]]*2,~ [sd ~ [sd:2? bd?]]").bank('RolandTR909').gain(.5).slow(2))`,
	},
	{
		name: "barryHarris",
		by: "Unknown",
		code: `// adapted from a Barry Harris exercise
"0,2,[7 6]"
  .add("<0 1 2 3 4 5 7 8>")
  .scale('C bebop major')
  .transpose("<0 1 2 1>/8")
  .slow(2)
  .note().piano()
  .color('#00B8D4')`,
	},
	{
		name: "Bass fuge",
		by: "Felix Roos",
		code: `// "Bass fuge"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples({ flbass: ['00_c2_finger_long_neck.wav','01_c2_finger_short_neck.wav','02_c2_finger_long_bridge.wav','03_c2_finger_short_bridge.wav','04_c2_pick_long.wav','05_c2_pick_short.wav','06_c2_palm_mute.wav'] }, 
  'github:cleary/samples-flbass/main/')
samples({
bd: ['bd/BT0AADA.wav','bd/BT0AAD0.wav','bd/BT0A0DA.wav','bd/BT0A0D3.wav','bd/BT0A0D0.wav','bd/BT0A0A7.wav'],
sd: ['sd/rytm-01-classic.wav','sd/rytm-00-hard.wav'],
hh: ['hh27/000_hh27closedh.wav','hh/000_hh3closedh.wav'],
}, 'github:tidalcycles/dirt-samples');

setcps(1)

"<8(3,8) <7 7*2> [4 5@3] 8>".sub(1) // sub 1 -> 1-indexed
.layer(
x=>x,
x=>x.add(7)
.off(1/8,x=>x.add("2,4").off(1/8,x=>x.add(5).echo(4,.125,.5)))
.slow(2),
).n().scale('A1 minor')
.s("flbass").n(0)
.mul(gain(.3))
.cutoff(sine.slow(7).range(200,4000))
.resonance(10)
//.hcutoff(400)
.clip(1)
.stack(s("bd:1*2,~ sd:0,[~ hh:0]*2"))
.pianoroll({vertical:1})`,
	},
	{
		name: "Belldub",
		by: "Felix Roos",
		code: `// "Belldub"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples({ bell: {b4:'https://cdn.freesound.org/previews/339/339809_5121236-lq.mp3'}})
// "Hand Bells, B, Single.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
stack(
  // bass
  note("[0 ~] [2 [0 2]] [4 4*2] [[4 ~] [2 ~] 0@2]".scale('g1 dorian').superimpose(x=>x.add(.02)))
  .s('sawtooth').cutoff(200).resonance(20).gain(.15).shape(.6).release(.05),
  // perc
  s("[~ hh]*4").room("0 0.5".fast(2)).end(perlin.range(0.02,1)),
  s("mt lt ht").struct("x(3,8)").fast(2).gain(.5).room(.5).sometimes(x=>x.speed(".5")),
  s("misc:2").speed(1).delay(.5).delaytime(1/3).gain(.4),
  // chords
  chord("[~ Gm7] ~ [~ Dm7] ~")
  .dict('lefthand').voicing()
  .add(note("0,.1"))
  .s('sawtooth').gain(.8)
  .cutoff(perlin.range(400,3000).slow(8))
  .decay(perlin.range(0.05,.2)).sustain(0)
  .delay(.9).room(1),
  // blips
  note(
    "0 5 4 2".iter(4)
    .off(1/3, add(7))
    .scale('g4 dorian')
  ).s('square').cutoff(2000).decay(.03).sustain(0)
  .degradeBy(.2)
  .orbit(2).delay(.2).delaytime(".33 | .6 | .166 | .25")
  .room(1).gain(.5).mask("<0 1>/8"),
  // bell
  note(rand.range(0,12).struct("x(5,8,-1)").scale('g2 minor pentatonic')).s('bell').begin(.05)
  .delay(.2).degradeBy(.4).gain(.4)
  .mask("<1 0>/8")
).slow(5)`,
	},
	{
		name: "Blippy Rhodes",
		by: "Felix Roos",
		code: `// "Blippy Rhodes"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples({
  bd: 'samples/tidal/bd/BT0A0D0.wav',
  sn: 'samples/tidal/sn/ST0T0S3.wav',
  hh: 'samples/tidal/hh/000_hh3closedh.wav',
  rhodes: {
  E1: 'samples/rhodes/MK2Md2000.mp3',
  E2: 'samples/rhodes/MK2Md2012.mp3',
  E3: 'samples/rhodes/MK2Md2024.mp3',
  E4: 'samples/rhodes/MK2Md2036.mp3',
  E5: 'samples/rhodes/MK2Md2048.mp3',
  E6: 'samples/rhodes/MK2Md2060.mp3',
  E7: 'samples/rhodes/MK2Md2072.mp3'
  }
}, 'https://loophole-letters.vercel.app/')

stack(
  s("<bd sn> <hh hh*2 hh*3>").color('#00B8D4'),
  "<g4 c5 a4 [ab4 <eb5 f5>]>"
  .scale("<C:major C:mixolydian F:lydian [F:minor <Db:major Db:mixolydian>]>")
  .struct("x*8")
  .scaleTranspose("0 [-5,-2] -7 [-9,-2]")
  .slow(2)
  .note()
  .clip(.3)
  .s('rhodes')
  .room(.5)
  .delay(.3)
  .delayfeedback(.4)
  .delaytime(1/12).gain(.5).color('#7ED321'),
  "<c2 c3 f2 [[F2 C2] db2]>/2"
  .add("0,.02")
  .note().gain(.3)
  .clip("<1@3 [.3 1]>/2")
  .cutoff(600)
  .lpa(.2).lpenv(-4)
  .s('sawtooth').color('#F8E71C'),
).fast(3/2)
//.pianoroll({fold:1})`,
	},
	{
		name: "Caverave",
		by: "Felix Roos",
		code: `// "Caverave"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

const keys = x => x.s('sawtooth').cutoff(1200).gain(.5)
  .attack(0).decay(.16).sustain(.3).release(.1);

const drums = stack(
  s("bd*2").mask("<x@7 ~>/8").gain(.8),
  s("~ <sd!7 [sd@3 ~]>").mask("<x@7 ~>/4").gain(.5),
  s("[~ hh]*2").delay(.3).delayfeedback(.5).delaytime(.125).gain(.4)
);

const synths = stack(
  
  "<eb4 d4 c4 b3>/2"
  .scale("<C:minor!3 C:melodic:minor>/2")
  .struct("[~ x]*2")
  .layer(
    x=>x.scaleTranspose(0).early(0),
    x=>x.scaleTranspose(2).early(1/8),
    x=>x.scaleTranspose(7).early(1/4),
    x=>x.scaleTranspose(8).early(3/8)
  ).note().apply(keys).mask("<~ x>/16")
  .color('darkseagreen'),
  
  note("<C2 Bb1 Ab1 [G1 [G2 G1]]>/2")
  .struct("[x [~ x] <[~ [~ x]]!3 [x x]>@2]/2".fast(2))
  .s('sawtooth').attack(0.001).decay(0.2).sustain(1).cutoff(500)
  .color('brown'),
  chord("<Cm7 Bb7 Fm7 G7b13>/2")
  .struct("~ [x@0.2 ~]".fast(2))
  .dict('lefthand').voicing()
  .every(2, early(1/8))
  .apply(keys).sustain(0)
  .delay(.4).delaytime(.12)
  .mask("<x@7 ~>/8".early(1/4))
).add(note("<-1 0>/8"))
stack(
  drums.fast(2).color('tomato'), 
  synths
).slow(2)
  //.pianoroll({fold:1})`,
	},
	{
		name: "Chop",
		by: "Felix Roos",
		code: `// "Chop"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples({ p: 'https://cdn.freesound.org/previews/648/648433_11943129-lq.mp3' })

s("p")
  .loopAt(32)
  .chop(128)
  .jux(rev)
  .shape(.4)
  .decay(.1)
  .sustain(.6)`,
	},
	{
		name: "Delay",
		by: "Felix Roos",
		code: `// "Delay"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

stack(
    s("bd <sd cp>")
    .delay("<0 .5>")
    .delaytime(".16 | .33")
    .delayfeedback(".6 | .8")
  ).sometimes(x=>x.speed("-1"))`,
	},
	{
		name: "Dinofunk",
		by: "Felix Roos",
		code: `// "Dinofunk"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

setcps(1)

samples({bass:'https://cdn.freesound.org/previews/614/614637_2434927-hq.mp3',
dino:{b4:'https://cdn.freesound.org/previews/316/316403_5123851-hq.mp3'}})
setVoicingRange('lefthand', ['c3','a4'])

stack(
s('bass').loopAt(8).clip(1),
s("bd*2, ~ sd,hh*4"),
chord("Abm7")
  .mode("below:G4")
  .dict('lefthand')
  .voicing()
  .struct("x(3,8,1)".slow(2)),
"0 1 2 3".scale('ab4 minor pentatonic')
.superimpose(x=>x.add(.1))
.sometimes(x=>x.add(12))
.note().s('sawtooth')
.cutoff(sine.range(400,2000).slow(16)).gain(.8)
.decay(perlin.range(.05,.2)).sustain(0)
.delay(sine.range(0,.5).slow(32))
.degradeBy(.4).room(1),
note("<b4 eb4>").s('dino').delay(.8).slow(8).room(.5)
)`,
	},
	{
		name: "Echo piano",
		by: "Felix Roos",
		code: `// "Echo piano"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

n("<0 2 [4 6](3,4,2) 3*2>").color('salmon')
.off(1/4, x=>x.add(n(2)).color('green'))
.off(1/2, x=>x.add(n(6)).color('steelblue'))
.scale('D minor')
.echo(4, 1/8, .5)
.clip(.5)
.piano()
.pianoroll()`,
	},
	{
		name: "Festival of fingers",
		by: "Felix Roos",
		code: `// "Festival of fingers"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

const chords = "<Cm7 Fm7 G7 F#7>";
stack(
  chord(chords).dict('lefthand').voicing()
  .struct("x(3,8,-1)")
  .gain(.5).off(1/7,x=>x.add(note(12)).mul(gain(.2))),
  chords.rootNotes(2).struct("x(4,8,-2)").note(),
  chords.rootNotes(4)
  .scale(cat('C minor','F dorian','G dorian','F# mixolydian'))
  .struct("x(3,8,-2)".fast(2))
  .scaleTranspose("0 4 0 6".early(".125 .5"))
  .layer(scaleTranspose("0,<2 [4,6] [5,7]>/4"))
  .note()
).slow(2)
 .mul(gain(sine.struct("x*8").add(3/5).mul(2/5).fast(8)))
 .piano()`,
	},
	{
		name: "Festival of fingers 3",
		by: "Felix Roos",
		code: `// "Festival of fingers 3"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

setcps(1)

n("[-7*3],0,2,6,[8 7]")
  .echoWith(
    4, // echo 4 times
    1/4, // 1/4s between echos
    (x,i)=>x
      .add(n(i*7)) // add octaves
      .gain(1/(i+1)) // reduce gain
      .clip(1/(i+1))
    )
  .mul(gain(perlin.range(.5,.9).slow(8)))
  .stack(n("[22 25]*3")
         .clip(sine.range(.5,2).slow(8))
         .gain(sine.range(.4,.8).slow(5))
         .echo(4,1/12,.5))
  .scale("<D:dorian G:mixolydian C:dorian F:mixolydian>")
  .slow(2).piano()
//.pianoroll({maxMidi:160})`,
	},
	{
		name: "Flatrave",
		by: "Felix Roos",
		code: `// "Flatrave"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

stack(
  s("bd*2,~ [cp,sd]").bank('RolandTR909'),
  
  s("hh:1*4").sometimes(fast("2"))
  .rarely(x=>x.speed(".5").delay(.5))
  .end(perlin.range(0.02,.05).slow(8))
  .bank('RolandTR909').room(.5)
  .gain("0.4,0.4(5,8,-1)"),
  
  note("<0 2 5 3>".scale('G1 minor')).struct("x(5,8,-1)")
  .s('sawtooth').decay(.1).sustain(0)
  .lpa(.1).lpenv(-4).lpf(800).lpq(8),
  
  note("<G4 A4 Bb4 A4>,Bb3,D3").struct("~ x*2").s('square').clip(1)
  .cutoff(sine.range(500,4000).slow(16)).resonance(10)
  .decay(sine.slow(15).range(.05,.2)).sustain(0)
  .room(.5).gain(.3).delay(.2).mask("<0 1@3>/8"),
  
  "0 5 3 2".sometimes(slow(2)).off(1/8,add(5)).scale('G4 minor').note()
  .decay(.05).sustain(0).delay(.2).degradeBy(.5).mask("<0 1>/16")
)`,
	},
	{
		name: "giantSteps",
		by: "John Coltrane",
		code: `// John Coltrane - Giant Steps

let melody = seq(
  "[F#5 D5] [B4 G4] Bb4 [B4 A4]",
  "[D5 Bb4] [G4 Eb4] F#4 [G4 F4]",
  "Bb4 [B4 A4] D5 [D#5 C#5]",
  "F#5 [G5 F5] Bb5 [F#5 F#5]",
).note()

stack(
  // melody
  melody.color('#F8E71C'),
  // chords
  seq(
    "[B^7 D7] [G^7 Bb7] Eb^7 [Am7 D7]",
    "[G^7 Bb7] [Eb^7 F#7] B^7 [Fm7 Bb7]",
    "Eb^7 [Am7 D7] G^7 [C#m7 F#7]",
    "B^7 [Fm7 Bb7] Eb^7 [C#m7 F#7]"
  ).chord().dict('lefthand')
  .anchor(melody).mode('duck')
  .voicing().color('#7ED321'),
  // bass
  seq(
    "[B2 D2] [G2 Bb2] [Eb2 Bb3] [A2 D2]",
    "[G2 Bb2] [Eb2 F#2] [B2 F#2] [F2 Bb2]",
    "[Eb2 Bb2] [A2 D2] [G2 D2] [C#2 F#2]",
    "[B2 F#2] [F2 Bb2] [Eb2 Bb3] [C#2 F#2]"
  ).note().color('#00B8D4')
).slow(20)
.pianoroll({fold:1})`,
	},
	{
		name: "Good times",
		by: "Felix Roos",
		code: `// "Good times"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

const scale = cat('C3 dorian','Bb2 major').slow(4);
stack(
  n("2*4".add(12)).off(1/8, add(2))
  .scale(scale)
  .fast(2)
  .add("<0 1 2 1>").hush(),
  "<0 1 2 3>(3,8,2)".off(1/4, add("2,4"))
  .n().scale(scale),
  n("<0 4>(5,8,-1)").scale(scale).sub(note(12))
)
  .gain(".6 .7".fast(4))
  .add(note(4))
  .piano()
  .clip(2)
  .mul(gain(.8))
  .slow(2)
  .pianoroll()`,
	},
	{
		name: "Holy flute",
		by: "Felix Roos",
		code: `// "Holy flute"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

"c3 eb3(3,8) c4/2 g3*2"
.superimpose(
  x=>x.slow(2).add(12),
  x=>x.slow(4).sub(5)
).add("<0 1>/16")
.note().s('ocarina_vib').clip(1)
.release(.1).room(1).gain(.2)
.color("salmon | orange | darkseagreen")
.pianoroll({fold:0,autorange:0,vertical:0,cycles:12,smear:0,minMidi:40})`,
	},
	{
		name: "Jux und tollerei",
		by: "Felix Roos",
		code: `// "Jux und tollerei"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

note("c3 eb3 g3 bb3").palindrome()
.s('sawtooth')
.jux(x=>x.rev().color('green').s('sawtooth'))
.off(1/4, x=>x.add(note("<7 12>/2")).slow(2).late(.005).s('triangle'))
.lpf(sine.range(200,2000).slow(8))
.lpa(.2).lpenv(-2)
.decay(.05).sustain(0)
.room(.6)
.delay(.5).delaytime(.1).delayfeedback(.4)
.pianoroll()`,
	},
	{
		name: "Lounge sponge",
		by: "Felix Roos",
		code: `// "Lounge sponge"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos, livecode.orc by Steven Yi

await loadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')

stack(
  chord("<Cm7 A7 Dm7 Fm7>/2").dict('lefthand').voicing()
  .cutoff(sine.range(500,2000).round().slow(16))
  .euclidLegato(3,8).csound('FM1')
  ,
  note("<C2 A1 D2 F2>/2").ply(8).csound('Bass').gain("1 4 1 4")
  ,
  n("0 7 [4 3] 2".fast(2/3).off(".25 .125", add("<2 4 -3 -1>"))
  .slow(2).scale('A4 minor'))
  .clip(.25).csound('SynHarp')
  ,
  s("bd*2,[~ hh]*2,~ cp").bank('RolandTR909')
)`,
	},
	{
		name: "Melting submarine",
		by: "Felix Roos",
		code: `// "Melting submarine"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples('github:tidalcycles/dirt-samples')
stack(
  s("bd:5,[~ <sd:1!3 sd:1(3,4,3)>],hh27(3,4,1)") // drums
  .speed(perlin.range(.7,.9)) // random sample speed variation
  //.hush()
  ,"<a1 b1*2 a1(3,8) e2>" // bassline
  .off(1/8,x=>x.add(12).degradeBy(.5)) // random octave jumps
  .add(perlin.range(0,.5)) // random pitch variation
  .superimpose(add(.05)) // add second, slightly detuned voice
  .note() // wrap in "note"
  .decay(.15).sustain(0) // make each note of equal length
  .s('sawtooth') // waveform
  .gain(.4) // turn down
  .cutoff(sine.slow(7).range(300,5000)) // automate cutoff
  .lpa(.1).lpenv(-2)
  //.hush()
  ,chord("<Am7!3 <Em7 E7b13 Em7 Ebm7b5>>")
  .dict('lefthand').voicing() // chords
  .add(note("0,.04")) // add second, slightly detuned voice
  .add(note(perlin.range(0,.5))) // random pitch variation
  .s('sawtooth') // waveform
  .gain(.16) // turn down
  .cutoff(perlin.range(400,3000).slow(8))
  .decay(perlin.range(0.05,.2)).sustain(0)
  .delay(.9).room(1)
  //.hush()
  ,"a4 c5 <e6 a6>".struct("x(5,8,-1)")
  .superimpose(x=>x.add(.04)) // add second, slightly detuned voice
  .add(perlin.range(0,.5)) // random pitch variation
  .note() // wrap in "note"
  .decay(.1).sustain(0) // make notes short
  .s('triangle') // waveform
  .degradeBy(perlin.range(0,.5)) // randomly controlled random removal :)
  .echoWith(4,.125,(x,n)=>x.gain(.15*1/(n+1))) // echo notes
  //.hush()
)
  .slow(3/2)`,
	},
	{
		name: "Orbit",
		by: "Felix Roos",
		code: `// "Orbit"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

stack(
    s("bd <sd cp>")
    .delay(.5)
    .delaytime(.33)
    .delayfeedback(.6),
    s("hh*2")
    .delay(.8)
    .delaytime(.08)
    .delayfeedback(.7)
    .orbit(2)
  ).sometimes(x=>x.speed("-1"))`,
	},
	{
		name: "Random bells",
		by: "Felix Roos",
		code: `// "Random bells"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

samples({
  bell: { c6: 'https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3' },
  bass: { d2: 'https://cdn.freesound.org/previews/608/608286_13074022-lq.mp3' }
})

stack(
  // bells
  n("0").euclidLegato(3,8)
  .echo(3, 1/16, .5)
  .add(n(rand.range(0,12)))
  .scale("D:minor:pentatonic")
  .velocity(rand.range(.5,1))
  .s('bell').gain(.6).delay(.2).delaytime(1/3).delayfeedback(.8),
  // bass
  note("<D2 A2 G2 F2>").euclidLegatoRot(6,8,4).s('bass').clip(1).gain(.8)
)
  .slow(6)
  .pianoroll({vertical:1})`,
	},
	{
		name: "Sample demo",
		by: "Felix Roos",
		code: `// "Sample demo"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

stack(
  // percussion
  s("[woodblock:1 woodblock:2*2] snare_rim:0,gong/8,brakedrum:1(3,8),~@3 cowbell:3")
  .sometimes(x=>x.speed(2)),
  // melody
  note("<0 4 1 3 2>".off(".25 | .125",add(2)).scale('D3 hirajoshi'))
  .s("clavisynth").gain(.2).delay(.25).jux(rev)
  .degradeBy(sine.range(0,.5).slow(32)),
  // bass
  note("<0@3 <2(3,8) 3(3,8)>>".scale('D1 hirajoshi'))
  .s('psaltery_pluck').gain(.6).clip(1)
  .release(.1).room(.5)
)`,
	},
	{
		name: "swimming",
		by: "Koji Kondo",
		code: `// Koji Kondo - Swimming (Super Mario World)
stack(
  seq(
    "~",
    "~",
    "~",
    "A5 [F5@2 C5] [D5@2 F5] F5",
    "[C5@2 F5] [F5@2 C6] A5 G5",
    "A5 [F5@2 C5] [D5@2 F5] F5",
    "[C5@2 F5] [Bb5 A5 G5] F5@2",
    "A5 [F5@2 C5] [D5@2 F5] F5",
    "[C5@2 F5] [F5@2 C6] A5 G5",
    "A5 [F5@2 C5] [D5@2 F5] F5",
    "[C5@2 F5] [Bb5 A5 G5] F5@2",
    "A5 [F5@2 C5] A5 F5",
    "Ab5 [F5@2 Ab5] G5@2",
    "A5 [F5@2 C5] A5 F5",
    "Ab5 [F5@2 C5] C6@2",
    "A5 [F5@2 C5] [D5@2 F5] F5",
    "[C5@2 F5] [Bb5 A5 G5] F5@2"
  ).color('#FFEBB5'),
  seq(
    "[F4,Bb4,D5] [[D4,G4,Bb4]@2 [Bb3,D4,F4]] [[G3,C4,E4]@2 [[Ab3,F4] [A3,Gb4]]] [Bb3,E4,G4]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, Bb3, Db3] [F3, Bb3, Db3]]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [A3, C4, E4] [A3, C4, E4]] [~ [Ab3, C4, Eb4] [Ab3, C4, Eb4]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [G3, C4, E4] [G3, C4, E4]]",
    "[~ [F3, A3, C4] [F3, A3, C4]] [~ [F3, A3, C4] [F3, A3, C4]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [F3, Bb3, D4] [F3, Bb3, D4]] [~ [F3, Bb3, C4] [F3, Bb3, C4]] [~ [F3, A3, C4] [F3, A3, C4]] [~ [F3, A3, C4] [F3, A3, C4]]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [A3, C4, E4] [A3, C4, E4]] [~ [Ab3, C4, Eb4] [Ab3, C4, Eb4]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [G3, C4, E4] [G3, C4, E4]]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [F3, Bb3, D4] [F3, Bb3, D4]] [~ [F3, Bb3, C4] [F3, Bb3, C4]] [~ [F3, A3, C4] [F3, A3, C4]] [~ [F3, A3, C4] [F3, A3, C4]]",
    "[~ [Bb3, D3, F4] [Bb3, D3, F4]] [~ [Bb3, D3, F4] [Bb3, D3, F4]] [~ [A3, C4, F4] [A3, C4, F4]] [~ [A3, C4, F4] [A3, C4, F4]]",
    "[~ [Ab3, B3, F4] [Ab3, B3, F4]] [~ [Ab3, B3, F4] [Ab3, B3, F4]] [~ [G3, Bb3, F4] [G3, Bb3, F4]] [~ [G3, Bb3, E4] [G3, Bb3, E4]]",
    "[~ [Bb3, D3, F4] [Bb3, D3, F4]] [~ [Bb3, D3, F4] [Bb3, D3, F4]] [~ [A3, C4, F4] [A3, C4, F4]] [~ [A3, C4, F4] [A3, C4, F4]]",
    "[~ [Ab3, B3, F4] [Ab3, B3, F4]] [~ [Ab3, B3, F4] [Ab3, B3, F4]] [~ [G3, Bb3, F4] [G3, Bb3, F4]] [~ [G3, Bb3, E4] [G3, Bb3, E4]]",
    "[~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, A3, C3] [F3, A3, C3]] [~ [F3, Bb3, D3] [F3, Bb3, D3]] [~ [F3, B3, D3] [F3, B3, D3]]",
    "[~ [F3, Bb3, D4] [F3, Bb3, D4]] [~ [F3, Bb3, C4] [F3, Bb3, C4]] [~ [F3, A3, C4] [F3, A3, C4]] [~ [F3, A3, C4] [F3, A3, C4]]"
  ).color('#54C571'),
  seq(
    "[G3 G3 C3 E3]",
    "[F2 D2 G2 C2]",
    "[F2 D2 G2 C2]",
    "[F2 A2 Bb2 B2]",
    "[A2 Ab2 G2 C2]",
    "[F2 A2 Bb2 B2]",
    "[G2 C2 F2 F2]",
    "[F2 A2 Bb2 B2]",
    "[A2 Ab2 G2 C2]",
    "[F2 A2 Bb2 B2]",
    "[G2 C2 F2 F2]",
    "[Bb2 Bb2 A2 A2]",
    "[Ab2 Ab2 G2 [C2 D2 E2]]",
    "[Bb2 Bb2 A2 A2]",
    "[Ab2 Ab2 G2 [C2 D2 E2]]",
    "[F2 A2 Bb2 B2]",
    "[G2 C2 F2 F2]"
  ).color('#0077C9')
).note().slow(51)
//.pianoroll({fold:1})`,
	},
	{
		name: "Underground plumber",
		by: "Felix Roos",
		code: `// "Underground plumber"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos
// @details inspired by Friendship - Let's not talk about it (1979) :)

samples({ bd: 'bd/BT0A0D0.wav', sn: 'sn/ST0T0S3.wav', hh: 'hh/000_hh3closedh.wav', cp: 'cp/HANDCLP0.wav',
}, 'https://loophole-letters.vercel.app/samples/tidal/')

const h = x=>x.transpose("<0@2 5 0 7 5 0 -5>/2")

stack(
  s("<<bd*2 bd> sn> hh").fast(2).gain(.7),
  "[c2 a1 bb1 ~] ~"
  .echo(2, 1/16, 1)
  .slow(2)
  .note().s('square')
  .layer(h)
  .clip(.4)
  .cutoff(400).decay(.12).sustain(0)
  ,
  "[g2,[c3 eb3]]".iter(4)
  .echoWith(4, 1/8, (x,n)=>x.transpose(n*12).gain(Math.pow(.4,n)))
  .note().layer(h)
  .clip(.1)
)
  .fast(2/3)
  .pianoroll()`,
	},
	{
		name: "Waa2",
		by: "Felix Roos",
		code: `// "Waa2"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

note(
  "a4 [a3 c3] a3 c3"
  .sub("<7 12 5 12>".slow(2))
  .off(1/4,x=>x.add(7))
  .off(1/8,x=>x.add(12))
)
  .slow(2)
  .clip(sine.range(0.3, 2).slow(28))
  .s("sawtooth square".fast(2))
  .cutoff(cosine.range(500,4000).slow(16))
  .gain(.5)
  .room(.5)
  .lpa(.125).lpenv(-2).v("8:.125").fanchor(.25)`,
	},
	{
		name: "Wavy kalimba",
		by: "Felix Roos",
		code: `// "Wavy kalimba"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

setcps(1)

samples({
  'kalimba': { c5:'https://cdn.freesound.org/previews/536/536549_11935698-lq.mp3' }
})
const scales = "<C:major C:mixolydian F:lydian [F:minor Db:major]>"

stack(
  "[0 2 4 6 9 2 0 -2]*3"
  .add("<0 2>/4")
  .scale(scales)
  .struct("x*8")
  .velocity("<.8 .3 .6>*8")
  .slow(2),
  "<c2 c2 f2 [[F2 C2] db2]>"
  .scale(scales)
  .scaleTranspose("[0 <2 4>]*2")
  .struct("x*4")
  .velocity("<.8 .5>*4")
  .velocity(0.8)
  .slow(2)
)
  .fast(1)
  .note()
  .clip("<.4 .8 1 1.2 1.4 1.6 1.8 2>/8")
  .s('kalimba')
  .delay(.2)`,
	},
	{
		name: "zeldasRescue",
		by: "Koji Kondo",
		code: `// Koji Kondo - Princess Zelda's Rescue
stack(
  // melody
  \`[B3@2 D4] [A3@2 [G3 A3]] [B3@2 D4] [A3] 
  [B3@2 D4] [A4@2 G4] [D4@2 [C4 B3]] [A3]
  [B3@2 D4] [A3@2 [G3 A3]] [B3@2 D4] [A3]
  [B3@2 D4] [A4@2 G4] D5@2 
  [D5@2 [C5 B4]] [[C5 B4] G4@2] [C5@2 [B4 A4]] [[B4 A4] E4@2]
  [D5@2 [C5 B4]] [[C5 B4] G4 C5] [G5] [~ ~ B3]\`,
  // bass
  \`[[C2 G2] E3@2] [[C2 G2] F#3@2] [[C2 G2] E3@2] [[C2 G2] F#3@2]
  [[B1 D3] G3@2] [[Bb1 Db3] G3@2] [[A1 C3] G3@2] [[D2 C3] F#3@2]
  [[C2 G2] E3@2] [[C2 G2] F#3@2] [[C2 G2] E3@2] [[C2 G2] F#3@2]
  [[B1 D3] G3@2] [[Bb1 Db3] G3@2] [[A1 C3] G3@2] [[D2 C3] F#3@2]
  [[F2 C3] E3@2] [[E2 B2] D3@2] [[D2 A2] C3@2] [[C2 G2] B2@2]
  [[F2 C3] E3@2] [[E2 B2] D3@2] [[Eb2 Bb2] Db3@2] [[D2 A2] C3 [F3,G2]]\`
).transpose(12).slow(48)
  .superimpose(x=>x.add(0.06)) // add slightly detuned voice
  .note()
  .gain(.1)
  .s('triangle')
  .room(1)
  //.pianoroll({fold:1})`,
	},
	{
		name: "Ameliewaltz",
		by: "eefano",
		code: 'setDefaultVoicings(\'legacy\')\nstack(\n  n("[0@2 ~, ~ [[1,2,3] ~]!2]")\n  .chord("<[Dm Am]!2 [F C]!2>/4")\n  .anchor("<[B3 G3]!2 [C4 B3]!2>/4")\n  .voicing().velocity(0.5)\n  ,\n  n("<[3@5.5 2@0.5 1@3 0@3] [3@3.5 [4 3 2 1 2]@2.5 1@3 0@3] [2@5.5 1@0.5 -3@6]!2>/4")\n  .scale("a4:minor")\n  \n).s("gm_harmonica").lpf(4000).clip(1)\n  .attack(0.1).release(0.1)\n  .room(1.5)\n  .cpm(64).gain(.6)\n  .pianoroll()',
	},
	{
		name: "Anniesroom",
		by: "eefano",
		code: '// "Up In Annie\'s Room" (work in progress)\n// song @by The Sea Nymphs\n// script @by eefano\nsetcps(90/60)\n\nconst split = register(\'split\', (deflt, callback, pat) => \n  callback(deflt.map((d,i)=>pat.withValue((v)=>Array.isArray(v)?(i<v.length?v[i]:d):(i==0?v:d)))));\n\nc: "<0@32 1@24>/2".pickRestart([\n"<Bm@3 G Em A Em D G@2 A Em D G A Em>/2",\n"<C#m G A# F E B Em G@3 D# Dm A C#m G B A G A G A G A G>/2"])\n .layer(x=>x.chord().anchor(\'b4\').voicing().s("gm_reed_organ").attack(0.1).release(1.5).room(1).rsize(4).gain(0.4),\n        x=>n("<0!32 [0,1,2,3,4]!24>/2").chord(x).anchor(\'c3\').mode(\'root\').voicing().s("gm_church_organ").room(1).rsize(4).gain(0.4),\n        x=>n("<[0,[~ 1@20],[~@2 2@20],[~@3 3@20],[~@4 4@20]]>/2").chord(x).anchor(\'e4\').voicing().s("gm_acoustic_guitar_nylon").room(0.6).gain(0.5))\n\nv: "<0@16 1@16 2@24>/2".pickRestart([\n  "<f#3 ~ d3 e3 ~ e3 ~ f#3 ~ f3:-2 ~ d3@7 ~@14 d3@2 ~ b3 ~ b3 ~ e3@7 ~@18>*2",\n  "<f#4 ~ d4 e4 ~ e4 ~ f#4@4 d4:-4@7 ~@14 d4@2 ~ b4 ~ b4 ~ e4@7 ~@18>*2","<~>*2"])\n  .split([0,0],(x)=>note(x[0]).penv(x[1]))\n  .patt(\'0.4\').s("gm_choir_aahs:5").room(1).gain(1)\n\n//d: s("<hh>")',
	},
	{
		name: "Anothersatellite",
		by: "eefano",
		code: '// "Another Satellite" (work in progress)\n// song @by XTC\n// script @by eefano\nsetcps(119/60)\nsamples({\'gtr\': {\'g3\': \'https://cdn.freesound.org/previews/705/705412_11110011-lq.mp3\'}})\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\n\ngtr: "<~ 0:.6@2 1:.6@8 2@2 3@2.5 1:.6!2>/16".split([0,1],(y)=>y[0].pickRestart([\n  "<bb2@7 eb3>/2",\n  "<[bb2@3 eb3]!2 [c#3 f#3] [e3 d3] [g2@3 f3] [bb2@3 eb3] g2@2 >/8",\n  "<a3 g3 a3 f3 g3 f3 g3 e3>/4",\n  "<a3 g3 a3 f3 g3 f3 c3@4>/4"\n]).s(\'gtr\').begin(.045).end(.5).clip(1).note().gain(.9).room(2).gain(.8).velocity(y[1]))\n\nvox: "<~@3 0:0.6@8 1 2 1 3@1.5 ~!2>/16".split([0,1],(y)=>y[0].pickRestart([\n  `<~ d4:.7!3 d4:1 c4:.7!4 ~ f4 ~ d4@2:1 c4:1 bb3 ~ d4:.7!3 d4:1 c4:.7!4 d4!2 f4 d4!2 d4:1 db4 db4@3:1 ab3 ab3@2 ~@2\n  [db4!3]@6 db4 db4@2:1 d4 d4 ~ d4 ~@3 d4@2 d4 d4@2 d4 e4 d4@3 b3 b3@2:1 a3:1 g3@2 ~\n  ~ d4 d4@2 c4!3 c4@2 f4 d4@2:1 c4:1 bb3@3:1 g3:1 f3@2:1 c4@4:1:4 c#4@10:1 ~@22>*2`,\n  `<~@4 e4@4 e4@3 d4 db4@2:1 b3@2:1 a3@4:1 a4@3 a4!2 e4 e4@3:1 d4:1 c4@2>*2`,\n  `<~@4 d4@4 d4@3:1 c4:1 b3@2 a3@2:1 c4@4:1:4 b3@4:1:-1 ~@4>*2`,\n  `<~@4 [d4:1 e4:1 d4:1 c4:1 b3:1 a3]@12 c4:1:4@8 d4:1:2@8 a3:1:-4@8 ~@8>*2`,\n]).split([0, .9, 0], (x) => note(x[0]).clip(x[1]).penv(x[2])).patt(\'.2\').s(\'gm_oboe\').lpf(30000).room(.5).gain(1.7).velocity(y[1]))\n  .superimpose(x=>x.late(2).gain(0.5).pan("<0 1>/16").room(1.5))\n\nfaf: "<~@62 [0,1]@8 >/4".pickRestart([\n  `<~ d4:.5!2 d4@2:1 c4:.5!3 c4 ~ f4 ~ d4@2:1 c4:1 bb3 ~@2 d4:0.5 d4@2:1 c4:.5 c4:1 bb3:.5 bb3@2:1 f3@2:1 c4:1:4@3 ~ >*2`.pan(.3),\n  `<~ f4:.5!2 f4@2:1 eb4:.5!3 eb4 ~ bb4 ~ f4@2:1 eb4:1 d4 ~@2 f4:0.5 f4@2:1 eb4:.5 eb4:1 d4:.5 d4@2:1 bb3@2:1 eb4:1:4@3 ~ >*2`.pan(.7),\n]).split([0,.9,0],(x)=>note(x[0]).clip(x[1]).penv(x[2])).patt(\'.2\').s(\'triangle\').lpf(30000).room(.5).gain(0.2)\n\n$: s("<hh*2>").bank("RolandMT32").gain(.05).room(.2)\n$: s("<bd ~ ~ <bd ~>>*2").bank("RolandMT32").gain("<0.4 0.2>").room(.2)\n$: s("<[[~ ~ rim]!5]@15 ~>*2").bank("RolandMT32").gain(.2).room(.2)',
	},
	{
		name: "Appealingtovenus",
		by: "eefano",
		code: "// \"Appealing to Venus\" \n// song @by The Sea Nymphs\n// script @by eefano\nsetDefaultVoicings('legacy')\nconst chords = `<Cm@2 Ab@2 Db@2 Cm F Bb C@2 F Bb C@2 F Bb Eb Dm [Cm Dm] [Eb ~] Eb Dm [Cm Dm] [Eb ~]\n                C@2 Ab Eb Ab A E B Db Cm [Bbm Cm] [Db ~] Db Cm [Bbm Cm] [Db ~]>/2`\nstack( \n  // melody\n  `<\n     ~@2 c5 d5@2 eb5 d5@3 c5@2 g#4@3 eb5@8 ~@2\n   ~@2 c#5 d#5@2 f5 d#5@3 c#5@2 d#5@3\n   d#5@3 f5@3 a5@3 a#5@3 a#5@3 g5@6 f5 e5@4 \n   ~ e5 f5@2 a5@3 a#5@3 a#5@3 g5@6 f5 e5@4 \n   ~ e5 f5@2 a5@3 a#5@3 a#5@3 \n   g5@7 f5@6 d#5@3 f5@3 g5@6\n   ~@24\n\n    e5@2 e5@3 f5@3 g5@3 g#5@3 g5@3 g5@3 c6@3\n    c6@3 c6@3 c#6@3 b5@3 [f#5 g#5 f#5@3]@3 e5@3 b5@3 b5@3\n    g#5@7 d#5@6 c#5@3 d#5@3 f5@6\n    ~@24\n   >*3`.note().clip(0.95).s('gm_oboe').gain(0.5)\n  ,\n  // second voice\n  `<\n    ~@150\n  \n    c5@2 c5@3 d5@3 e5@3 d#5@3 d#5@3 c5@3 g5@3\n    g5@3 g5@3 g#5@3 e5@3 [c#5 d#5 c#5@3]@3 b4@3 f#5@3 f#5@3\n    c#5@7 c5@6 a#4@3 c5@3 c#5@6\n    ~@24\n   >*3`.note().clip(0.95).s('gm_oboe').gain(0.5)\n  ,\n  chords.rootNotes(2).note().s('gm_bassoon').lpf(400).gain(0.5),\n  chord(chords).anchor(\"C5\").voicing().struct(\"x\").piano().gain(0.4),\n  chord(chords).anchor(\"E5\").voicing().s('gm_drawbar_organ').gain(0.15),\n  \n).cpm(120).room(0.5)//.pianoroll()",
	},
	{
		name: "Aztecchallenge",
		by: "eefano",
		code: '// "Aztec Challenge"\n// song @by Paul Norman\n// script @by eefano\nsetcps(180/60)\nlet parts = \n{a1:n("<0>/32")\n,a2:n("<-7>/32")\n,a3:n("<-14@5 [4 7]*5 4@2 >/4")\n,b:n("<0 ~@3 0 ~ 0 ~>*4".sub(7))\n,c1:n("<0@2 2 1 1b@2 3 2>")\n,c2:n("<<0 1b> 5 4 3 4 5 4 3>*2")\n,d1:n("<0@2 2 1 1b@2 3 2>/2")\n,d2:n("<<-7 -6b> -2 -3 -4 -3 -2 -3 -4>")\n,e1:n("<0 ~ 0 1 0 ~ 0 1 0 ~ 0 1 2 1 0 -1 1 ~ 1 2 1 ~ 1 2 1 ~ 1 2 1 0 -1 -2#>*2")\n,e2:n("<-2@2 4b ~ 2@2 4b 5 >*2")\n,e3:n("<2@3 3 3#@3 4 7@2 6 5# 3#@3 4 7@2 6 5# 3#@3 1 0@8>/2")\n}\nsid1: "<a1@2 ~ b c1@2 b a1@2 e1@3 e2 e1@3 e2 e1@3 e2 e1@3 e2>/16".pickRestart(parts).scale(\'a1:minor\').s(\'gm_lead_2_sawtooth\').lpf(4000).color(\'yellow\').gain(0.9)._scope()\nsid2: "<a2@2 b@2 c2@2 d1 a2@2 e1@3 e2 e1@3 e2 e1@3 e2 e1@3 e2>/16".pickRestart(parts).scale(\'a2:minor\').s(\'sawtooth\').lpf(3000).color(\'cyan\')._scope()\nsid3: "<a3@2 ~@2 b@2 d2 a3@2 ~@4 e3@4 e3@4 e3@4>/16".pickRestart(parts).scale(\'a4:minor\').s("<triangle@17 sawtooth@8>/16").color(\'magenta\')._scope()',
	},
	{
		name: "Bigship",
		by: "eefano",
		code: '// "Big Ship (Coda)"\r\n// song @by Cardiacs\r\n// script @by eefano\r\nsetDefaultVoicings(\'legacy\')\r\nconst progr = "<Am!2 D F Am D@2 Am!2 A# Am E@2 C F Am D@4>".fast(2);\r\nconst anchr = "<A5 F5 F5 F5 F5 G5@2 A5 F5 G#5 F5 E5@2 E5 F5 F5 G5@4>".fast(2);\r\n\r\nstack(\r\n n("-2 -1 0 2 0 1").chord(progr).anchor("G5").voicing().s(\'gm_violin\').clip(1).gain(0.3).room(0.1)\r\n, chord(progr).anchor(anchr).voicing().s(\'gm_drawbar_organ\').clip(1).gain(0.9).room(0.3)\r\n, chord(progr).rootNotes(1).struct("x*2").s(\'gm_electric_bass_finger\').clip(1).gain(1)\r\n  \r\n, s("[bd!2 ~ bd]*2").bank("AkaiLinn").lpf(200).gain(0.35)\r\n, s("[~ <[sd ~ ~ sd] sd>]*2").bank("AkaiLinn").hpf(250).lpf(4000).gain(0.30)\r\n, s("oh*4").gain(0.15) \r\n\r\n).cpm(120/4).room(0.3)//.pianoroll()',
	},
	{
		name: "Bluemonday",
		by: "eefano",
		code: 'stack(\n  s("bd!2 [bd*4]!2 bd!4").slow(8).bank("SequentialCircuitsDrumtracks"), \n  s("~ hh").bank("SequentialCircuitsDrumtracks"), \n  n("<[[2 ~] [2 ~] 2 3] [[3 ~] [3 ~] 3 3]>@4 [-1 ~] -1 -1 [0 ~] 0 0 [0 ~] 0 0 [0 ~] 0 0").slow(8).scale("d2:minor").s("gm_lead_8_bass_lead")\n).cpm(130)',
	},
	{
		name: "Breakfastline",
		by: "eefano",
		code: '// "Theme from The Breakfast Line"\n// song @by Cardiacs\n// script @by eefano\nconst maj = "[0,4,7]"\nconst imaj = "[0,4,-5]"\nconst melody =`[\n    c#6@2 f5 c6@3 a#5 a5@2 g5@3 c#5 e5@2 d#5@2 f#5 a5@3 a5@3\n    a5 g5 f5 d#5 c#5 b4 a5@3 a5@3 f5 g5 a5 a#5 g#5 g5 f5 g5 a5 b5 d5 g5 \n    c#5@2 b4 f5@3 c#5 d#5 f5 g5 c#5@2 c5@3 c#5@3 c#5@6\n    c#5 g#5 g5 a#4 f5 d#5 c#5 c5 g#5 c#5 c5 b4 c#5@2 b4 a5@3 c#5 b4@2 a5@6 \n    b5 g5@2 e5 a5 b5 b5@6 b5 a#5 g5 a5@3 b5 g5 d5 c#5 a5@2 b5 g5 d#5 c#5 a5@2\n    g5@2 d#5 f5 d#5 c#5 b4 a4 g4 a4 b4 c#5 d#5 f5 g5 ]/24`.clip(0.93)\nstack( \n   // melody   \n  melody.note().transpose(  0).s(\'gm_overdriven_guitar\').pan(0.45).gain(0.70),   \n  melody.note().transpose(-12).s(\'gm_overdriven_guitar\').pan(0.55).gain(0.80),   \n  // chords\n  "<C#4 D#4 F4 G4 A3 B3>*2".add(imaj)\n  .note().s(\'gm_string_ensemble_2\').gain(0.6),\n  // bass\n  "<C#2 D#2 C2 D2 A1 B1>*2".clip(0.90)\n  .note().s(\'gm_electric_bass_finger\').gain(0.7), \n  // drums\n  s("<[bd ~ bd sd ~ bd]!23 [sd*6]>").bank("AkaiLinn").gain(0.30),\n  s("hh*6").gain(0.10) \n).cpm(76/2).room(0.6)//.pianoroll()',
	},
	{
		name: "Budsandspawn",
		by: "eefano",
		code: '// "Buds And Spawn" (work in progress)\r\n// song @by Cardiacs\r\n// script @by eefano\r\nconst i_chords = x => x.s("recorder_tenor_sus").clip(1).decay(1.2).sustain(0).release(0.5)\r\nconst i_sax    = x => x.s("sax").gain(0.3).clip(1).release(0)\r\nconst i_bass   = x => x.s("triangle").clip(1).release(0.1)\r\nconst i_drums  = x => x.bank("YamahaRY30").clip(1).gain(0.08)\r\nconst i_piano  = x => x.piano().gain(0.2)\r\n\r\nconst I_chord = n("[0,2,4]")\r\nconst p_up = n("[-5@0.5 -4 -3 [-2 -1] 0 1 2@0.5]").clip(0.7)\r\nconst p_dw = p_up.rev()\r\n\r\nfunction stackme(sc, chordpart, saxpart, drumpart) {\r\n  return stack(chordpart.scale(sc).apply(i_chords), saxpart.scale(sc).apply(i_sax), s(drumpart).apply(i_drums))\r\n}\r\n\r\nconst s1=stackme("f#:major"    ,I_chord,p_up,"cr,bd")\r\nconst s2=stackme("a#:major"    ,I_chord,p_up,"[bd sd bd*2 sd bd*2 sd]")\r\nconst s3=stackme("b:whole:tone",I_chord,p_dw,"[sd@0.5 sd sd [ht ht] lt lt bd@0.5]")\r\nconst s4=stackme("f#:major"    ,I_chord,p_up,"[bd sd [~ bd] sd bd sd],hh*6")\r\n\r\narrange([3,s1],[1/1.2,s2.fast(1.2)],[1/1.3,s3.fast(1.3)],[4,s4]).cpm(165/4)\r\n  //.pianoroll()',
	},
	{
		name: "Bugfromheaven",
		by: "eefano",
		code: '// "Bug From Heaven (wip)"\n// song @by Tim Smith\n// script @by eefano\nsetcps(108/60/2)\nconst standardtuning = [40,45,50,55,59,64];\nconst fingering = \n{A:"0:0:2:2:2:0",Am:"0:0:2:2:1:0",A7:"x:0:2:0:2:0",D:"x:0:0:2:3:2",Dm:"x:0:0:2:3:1",D7:"x:0:0:2:1:2",\n E:"0:2:2:1:0:0",Em:"0:2:2:0:0:0",E7:"0:2:2:1:3:0",G7:"3:2:0:0:0:1",C:"x:3:2:0:1:0",\n // guitar only chords\n Dx:"x:0:0:2:3:2",Ds:"x:0:0:1:3:0",\n Ax:"0:0:2:2:2:0",Amx:"0:0:2:2:1:0",\n Ex:"0:2:2:1:0:0",Emx:"0:2:2:0:0:0",\n};\nconst gstrum = \n{u:"<[[1,[~ 3@10],4]@2 ~]!2 [1,4,5]>*3", \n v:"<[[0,[~ 3@10],5]@2 ~]!2 [0,3,4]>*3", \n w:"<[[1,[~ 3@10],4]@2 ~]!2 [1,2,3]>*3", \n x:"<[1,[~ 2@50],[~ ~ 4@50]] ~@3>/4",\n z:"<[[3,4,5] ~]*2>", \n k:"<[[2,3,4] ~]*2>",\n n:"~"\n};\nconst bstrum = {u:"<[1 2]>", v:"<[2 1]>", w:"<[1 0]>", x:"~", z:"~", k:"~", n:"0"};\n\nconst gString = register(\'gString\', (n, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+standardtuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=standardtuning) => (strums.pickOut(\n    [fingers.pickOut(fingering).gString(0),fingers.pickOut(fingering).gString(1),fingers.pickOut(fingering).gString(2)\n    ,fingers.pickOut(fingering).gString(3),fingers.pickOut(fingering).gString(4),fingers.pickOut(fingering).gString(5)]));\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\n\ngtr: "<~@2 [[0 1]!2]@16 2@3 3@13 4@3 3@4 5@2 3@13 4@3 3@4 5@2 3@4 3@2 6@11 3@4 5@2 3@13 4@3 3@4 5@2 3@4 3@2 6@11 3@4 5@2 7@8 [[0 1]!2]@16 8@5>"\n  .pickRestart([\n  "<Am:u:6 E:v:5 Am:u:4 E:v:3>","<Am:u:2 A:w:7>","<Am:u:2 E:x A:x>",\n  "<Dx:z Ds:z>","<Ax:z Emx:k:2 Ax:z:2>","<Ax:k:2 Ex:z:5>",\n  "<A:n:2 E:n A:n E:n E:n:4 A:n:4 E:n:2 E:n:6 A:n:6 A:n:11 E:n:9>",\n  "<E:k:2!3 A:k:1 E:k:5!3 A:k:2 >",/* 157 */"<Am:u:2 E:x@2 ~@2>"\n  ]).split([0,0,0],s=>s[0].layer(\n  x=>guitar(s[1].pick(gstrum),x).s("gm_acoustic_guitar_steel:1").release(.1).gain(.75).room(.5).hpf(300).lpf(5000).late(1/64),\n  x=>guitar(s[1].pick(bstrum),x).s("gm_pizzicato_strings:1").transpose(-12).release(.1).gain(.65).room(.6).lpf(1000),\n  x=>chord(x).anchor("g5").voicing().s("gm_string_ensemble_1").gain(.15).room(1).layer(p=>p.pan(1),p=>p.pan(0).late(.1))\n    ).transpose(s[2]))\n\nvox: "<~@25 0@22 0@22 1@13 2@10 0@22 1@13 3@8 ~@30>".pickRestart([\n "<f#4@2 f#4@3 [e4!2]@6 [f#4!2]@6 g#4@19 f#4@2 f#4@3 [e4!2]@6 [f#4!2]@6 c#4@13 b3@3 f#3@13 ~@100>*6",\n /*69*/"<f#4@2 f#4@3 [e4!2]@6 [f#4!2]@6 [g#4!2]@6 [a4!2]@6 [g#4!3]@9 d#4@3 [f4!2]@6 [f#4!2]@6 [f4!2]@6 [d#4!4]@12 c#4@3 f4@3 f#4@3>*6",\n /*82*/"<f#4@2 f#4@3 [e4!2]@6 [f#4!2]@6 b3@16 c#4@3 d4@12 ~@100>*6",\n /*127*/"<f#4 e4 [d4@2 ~] e4 [f#4@2 ~] a4 f#4@2>"\n]).s("sawtooth").note().attack(.05).release(.05).gain(.30).hpf(500).clip(0.95)\n\ndrm: "< 0@2 [0,1]@17 2 ~ 0@32>".pick([\n     s("<rd>*2"),\n     s("<~ sd>*2"),\n     s("<rd>")\n  ]).bank("BossDR110").room(1).lpf(1800).gain(.6)\n\nuff: "<[gm_acoustic_guitar_steel:1,gm_string_ensemble_1,gm_pizzicato_strings:1] ~@1000>".gain(0)',
	},
	{
		name: "Bustybeez",
		by: "eefano",
		code: '// "Busty Beez" (work in progress)\n// song @by Cardiacs\n// script @by eefano\nsetcps(182 / 60 / 8)\nconst beez = `<~@8 \n      i@28 j@18 k@5 l@2 m@30 n@22 o@22\n      i@28 j@18 k@5 l@2 m@30 n@22 o@22\n      n@22 m@30 k@5 l@2 k@5 p@16\n      i@28 j@18 j@18 k@5 l@2 m@30 k@5 l@2 m@30 n@22 o@22\n      i@28 j@18 k@5 l@2 m@30 n@22 o@22\n      i@28 j@18 k@5 l@2 m@30 n@22 o@22\n      n@22 m@30 k@5 l@2 k@5 p@16\n      i@28 j@18 j@18 k@5 l@2 m@30 k@5 l@2 m@30 n@22 q@6 p@16\n      i@28 j@18 j@18 j@18 j@18 j@18 j@18 j@18 j@18 ~@18 >`\nconst melody = {\n  i: "<b4@3 c5 g4@2 g4 f4 c#4 c#4@2 a4@2:4 a4 b4@2 b4 f#4 d#4 b3 c4 d#4 g#4 c5@2 c#5 c#4@2>",\n  j: "<d4 c#4 b3 b3 b4@2 a4 g4 f4 d#4 d#4 c#4 b3 g4@2 f4 d#4 c#4>",\n  k: "<c#4 c4@2 a#3@2>",\n  l: "<f#4@2>",\n  m: "<e4@2 a3@2 g#3 a#3 c4 c#4 d4 e4 f#4 [g#4 ~] g#4@2 a#4@2 c5@2 c#5@2 c5@2 f#4@2 g4@5 ~>",\n  n: "<g4 d4 b3 c#4 d#4 c#4 c4 a#3 a#3 d4 g4 g#4@2 a#4@2 a#4@2 f4 d4@2 g#4@2>",\n  o: "<g4@6 g4@12 g#4 d#4 a#4 b4>",\n  p: "<g4@4 g4@4 g4@3 g4 g#4 d#4 a#4 b4>",\n  q: "<g#4@2 g4@4>" }\nconst ch0rds = {\n  i: "<G@3 C@3 C#@3 A@4 F@3 B@4 G#@5 F#@3>",\n  j: "<G@10 A@8>",\n  k: "<F#@5>",\n  l: "<D@2>",\n  m: "<A@4 C#@4 D@4 E@2 A#@4 A@2 F@2 B@2 D#@6>",\n  n: "<G@2 B@3 F#@3 Gm@3 E@4 D#m@2 Dm@3 C#@2>",\n  o: "<C#@6 D#@4 C#@4 G@4 E B F# B>",\n  p: "<D#@4 C#@4 G@4 E B F# B>",\n  q: "<C#@6>" }\nconst drums = {\n  i: "<[bd,cr]@3 bd sd@2 bd@2 sd bd@2 sd@2 sd [bd,cr]@2 [bd,cr]@2 sd@2 bd!2 sd@2 sd [bd,cr]@2 sd>",\n  j: "<[bd,cr]@2 sd@3 bd sd [sd,mt] [sd,lt]!2 [bd,cr]@2 sd@3 bd@2 sd>",\n  k: "<[bd,cr] bd sd bd sd>",\n  l: "<[bd,cr]@2>",\n  m: "<[bd,cr]@2 sd@2 bd!2 sd@2 bd!2 sd@2 bd sd [bd,cr]@2 sd bd sd bd [bd,cr]@2 [bd,cr]@2 [bd,cr]@2 sd bd [sd,mt] lt>",\n  n: "<[bd,cr]@2 sd@3 bd@3 sd@2 bd sd@2 bd@2 bd@2 sd bd@2 [bd,cr]@2>",\n  o: "<sd@2 sd [bd,cr]!2 ~ [bd,cr]@2 sd bd [sd,mt] bd [bd,cr]@2 [bd,cr]@3 sd!2 [sd,mt] [sd,lt]!2 >",\n  p: "<[bd,cr]@2 sd bd [sd,mt] bd [bd,cr]@2 [bd,cr]@3 sd!2 [sd,mt] [sd,lt]!2>",\n  q: "<sd@2 sd [bd,cr]!2 ~>" }\nconst colors= {i:\'white\',j:\'yellow\',k:\'cyan\',l:\'green\',m:\'red\',n:\'salmon\',o:\'magenta\',p:\'orange\',q:\'lightgrey\'}\n\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\n\n$: beez.pickRestart(melody).split([0,0],s=>note(s[0]).penv(s[1])).patt(.1).clip(.98)\n  .layer(x=>x.s("gm_overdriven_guitar:3").vib(10).vibmod(.09).delay(.4).dt(.2).dfb(.30).gain(1),\n         x=>x.transpose(12).s("gm_pad_bowed:1").gain(.4))\n$: chord(beez.pickRestart(ch0rds)).anchor(\'F4\').voicing()\n  .layer(x=>x.s("gm_church_organ:3").pan(.40).gain(.4),\n         x=>x.s("gm_brass_section:1").pan(.55).gain(.7))\n$: beez.pickRestart(ch0rds).rootNotes(2).note()\n  .s("gm_electric_bass_pick:2").lpf(200).gain(.6)\n$: beez.pickRestart(drums).pickOut({\n          bd:s(\'bd\').velocity(.55).lpf(500),\n          sd:s(\'sd\').velocity(.55).hpf(200),\n          cr:s(\'cr\').velocity(.1).pan(.55),\n          mt:s(\'mt\').velocity(.3).pan(.6),\n          lt:s(\'lt\').velocity(.2).pan(.7)}).bank("linn9000").speed(.95).gain(.7)\n$: s("<r8_rd:1>").speed(1.1).hpf(4000).gain(.1)\n\nall(x => x.room(.2)\n    //.color(beez.pick(colors))\n    .fast(8)\n)',
	},
	{
		name: "Byebyespirit",
		by: "eefano",
		code: '// "Bye Bye Spirit" (Work In Progress)\n// song @by The Sea Nymphs\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nsetcps(140/60*3/4/3)\n\nconst ch = ["<Cm A# D# D E F C A E G# C# Cm F Cm F>", \n            "<A@8 ~ Em A G C B ~ A G C B ~ A G D Em ~ G D Em ~ ~>"]\nconst bs = ["<c2 a#1 d#2 d2 e2 f2 c2 a1 e2 g#1 c#2 c2 f2 c2 f2>"\n           ,"<a1 g1 f#1 f1 a1 g1 f#1 f1 ~ e2 a1 g1 c2 b1@2 a1 g1 c2 b1@2 a1 g1 f#1 e2@2 g1 f#1 e2@2 ~>"]\nconst me = ["<g4@2 ~ a#4@2 ~ g4@2 ~ f#4 d4 a3 g#3 b3 e4 a3 c4 f4 e4@4 ~@2 e4 b3 g#3 g#3 c4 g#4 f4 c#4@2 d#4 d4 c4 a3@2 ~ g4@3 a3@3>*3"\n           ,`<[a3 b3 c#4] g3 c#4 g3 [a3 b3 c#4] [g3@2 b3] c#4 g3 ~ \n              [e4 ~ e4] [a3 ~ a3] [b3 ~ b3] [[g3@4 f#3]@2 e3] b3 ~ \n              [a3 ~ a3] [b3 ~ b3] [[g3@4 f#3]@2 e3] b3 ~ g3 b3@2 ~ g3 b3@2 g3 ~ ~ >`]\n\npiano: "<0@30 1@30>".pickRestart(ch).chord().anchor("e4".add("<~ -2 2>*3")).voicing().struct("<~ x x>*3").piano().room(0.8).gain(0.4)\n\nbass: "<0@30 1@30>".pickRestart(bs).note().piano().room(.8).gain(0.6)\n\nbowed: n("<0 1 2 2 1 0>*3").chord("<~@15 0@15 ~@30>".pickRestart(ch)).anchor("g5").voicing().s(\'gm_pad_bowed\').sustain(0.4).room(0.7).gain(0.5)\n\nvoice: "<0@30 1@30>".pickRestart(me).transpose(12).s(\'triangle\').note().room(0.6).attack(0.05).release(0.2).gain(0.4).vmod(0.10).v(5)',
	},
	{
		name: "Cabinet",
		by: "eefano",
		code: '// "Cabinet" (work in progress)\n// song @by Spratleys Japs\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nfunction arr(p,l) { return [l,p.slow(l)]; }\n\nconst h1 = arr(`D@8 A F@3`,24/2);\nconst h2 = arr(`D@5 E C@3 A@2 B G@2 E@7 F# D@2 B C# A@2 F#@3 G# E@2`,68/2);\nconst h3 = arr(`C#@8 D# B@2 G# A# F#@2 D#@3 F C#@3 A# C G#@2 F@3 G D#@3 C@2 D A#@2 G@3 A F@2`,88/2);\n\nconst chords = arrange(h1,h2,h3);\n\n\nstack(\n  chord(chords).rootNotes(3).s(\'triangle\').lpf(400).gain(0.6),\n  chord(chords).anchor("E5").voicing().s(\'gm_drawbar_organ\').gain(0.35),\n\n  s("sleighbells").struct("x*6").gain(3),\n  s("[bd sd]").gain(0.4).room(2),\n  s("rd*6").gain(0.01)\n \n).cpm(133/8).pianoroll()',
	},
	{
		name: "Cadenza",
		by: "eefano",
		code: '// "The Cardiacs Cadence"\r\n// script @by eefano\r\nsetDefaultVoicings(\'legacy\')\r\nconst magic = "<G@3 Bm E@3 G#m C#@3 Fm A#@3 Dm>";\r\n\r\nstack(\r\nchord(magic).anchor("G4".transpose("<3 0 -3 0>")).voicing().struct("x").piano().gain(cosine.segment(16).range(0.5,1).slow(8)),\r\nchord(magic).anchor("B5".transpose("<0 -3 6 3>/16")).voicing().s("gm_drawbar_organ").gain(0.8),\r\n"<G2 E2 C#2 A#2>/4".transpose("<0 <-12 -8>>").struct("x!2").note().lpf(180).s("gm_electric_bass_finger").gain(1)\r\n).cpm(120/2).room(0.5).pianoroll()',
	},
	{
		name: "Changetempowitharrows",
		by: "eefano",
		code: "let mytempo = 0\nwindow.onkeydown = (e) => {\n    if (e.key === \'ArrowLeft\') { mytempo -= 1; console.log(mytempo); }\n    if (e.key === \'ArrowRight\') { mytempo += 1; console.log(mytempo); }\n}\nconst addmytempo = register(\'addmytempo\', (pat) => pat.withValue((v) => {\n    if (v.cps !== undefined) return { ...v, cps: v.cps + (mytempo / 60) };\n    else return v;\n}));\n\nnote(\"c d e f\").cps(100 / 60).addmytempo()",
	},
	{
		name: "Cinghiale",
		by: "eefano",
		code: '// "L\'Era Del Cinghiale Bianco" \r\n// song @by Franco Battiato\r\n// script @by eefano\r\nsetCps(127/60/2)\r\nsetDefaultVoicings(\'legacy\')\r\nstack(\r\n  "<0@16 1@14 >".pickRestart(["<[0 1]!2 [0 2] [0 3]>/4","<[4!2]@14>"]).pickRestart(\r\n   ["<[7 6 5 6 7 5 6 7]!2>".add("<0 1>")\r\n   ,"<[9 8 7 8]*3@1.5 [9 ~!1]@0.5>"\r\n   ,"<9 [~ 7 8 6]>","<9 [~ 7 8 9]>"\r\n   ,"<7@3 6@3 7@5 8 9 7 5@3 6@3 7@5 ~@5>*4"\r\n  ]).n().scale("c4:major").transpose("<[0 -5]@16 [[0@7 -5@8]!2]@14 >").s("sawtooth").vib(5).vmod(0.1).clip(0.85).attack(0.05).release(0.1).gain(0.6)\r\n\r\n,"<0@16 [1!2]@14 >".pickRestart(["<[Am G C@2]!2 [Em D G@2]!2>/4","<Am@3 G@3 C@5 ~@3 Em@3 D@3 G@5 ~@5>*4"])\r\n  .chord().anchor("C4").voicing().s("triangle").lpf(1200).attack(0.01).gain(0.35)\r\n      \r\n,"<0@16 1@14 >".pickRestart(["[[bd <~!7 bd>] sd],<hh!31 oh>*4",\r\n                       "<bd [sd bd] bd bd [sd bd] bd sd>*2,<hh!17 oh>*4"]).s().bank("YamahaRY30").clip(1).gain(0.4)\r\n).room(0.4)',
	},
	{
		name: "Clandeisiciliani",
		by: "eefano",
		code: '// "The Sicilian Clan" (work In Progress)\r\n// song @by Ennio Morricone\r\n// script @by eefano\r\nconst chrds = "<Am@3 E  Edim@2 D@3  Ddim E7@2 Am@3 [B@2 A#]@3 A@2 Am@2 E@2 Am@4>*2";\r\nconst anchr = "<E4@3 E4 E4@2   D4@3 D4  D4@2 C4@3 [B3@2 A#3]@3 A3@2 A3@2 G#3@2 A3@4>*2";\r\nconst dickt = {\r\n    \'\': [\'0 4 7\', \'4 7 12\', \'7 12 16\'], // major chords (no symbol)\r\n    m: [\'0 3 7\', \'3 7 12\', \'7 12 15\'], // minor chords via \'m\'\r\n    dim: [\'0 3 6\', \'3 6 12\', \'6 12 15\'], // diminished\r\n    7: [\'4 7 10\'], // upper 7th\r\n  };\r\nstack(\r\nn("<0@12 1@2>".pickRestart(["<[~ 0 1 0 2@2]!14 [~ 0 1 2 2@2] [~ 1 4 3 4@2]>*8/6","<2 ~>"]))\r\n  .chord(chrds).dict(dickt).anchor(anchr).voicing().s("gm_electric_guitar_jazz").gain(0.8).color(\'red\'),\r\nn("<[2@2 ~ 2 1@2 ~@2]!4>")\r\n  .chord(chrds).dict(dickt).anchor(chrds.rootNotes(2)).voicing().s("gm_electric_bass_finger").lpf(190).gain(1).color(\'blue\'),\r\n"<A4@2 C5 B4 A#4@2 A4@3 C5 B4 A#4 A4@2 C5@2 B4 A#4@2 A4@2 C5 B4 A#4 A4@2 ~@2>*2"\r\n  .note().s("gm_oboe").gain(0.4).color(\'green\'),\r\nchord(chrds).anchor("G4").struct("x*4").dict(dickt).voicing().s("gm_synth_strings_2").gain(0.2).color(\'yellow\'),\r\n\r\ns("[~ rim]*2").bank("AlesisHR16").gain(0.4),\r\ns("rd*8").note(42).bank("AkaiLinn").gain(0.08)\r\n  \r\n).cpm(120.3/4).room(0.6)//.pianoroll();',
	},
	{
		name: "Clubbed",
		by: "eefano",
		code: '// "Clubbed"\n// @by eefano\nsetcps(162/60/3)\nconst standardtuning = [40,45,50,55,59,64];\nconst fingering = \n{A:"x:0:2:2:2:0",Am:"x:0:2:2:1:0",A7:"x:0:2:0:2:0",D:"x:0:0:2:3:2",Dm:"x:0:0:2:3:1",D7:"x:0:0:2:1:2",\n E:"0:2:2:1:0:0",Em:"0:2:2:0:0:0",E7:"0:2:2:1:3:0",G7:"3:2:0:0:0:1",C:"x:3:2:0:1:0",\n};\nconst strumming = \n{d: "<[1,3,4]*8>/3", u:"<[2,4,5]*8>/3"\n};\nconst gString = register(\'gString\', (n, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+standardtuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=standardtuning) =>\n  (strums.pickRestart(strumming).pickOut(\n    [fingers.pickOut(fingering).gString(0),fingers.pickOut(fingering).gString(1),fingers.pickOut(fingering).gString(2)\n    ,fingers.pickOut(fingering).gString(3),fingers.pickOut(fingering).gString(4),fingers.pickOut(fingering).gString(5)]));\n\nguy: "<0@2 1 0 1 0>/24".pickRestart(["<Am Dm>/4","<Em G7>/4"]).layer(\n  x=>guitar("<u d>/3",x).s("gm_electric_guitar_clean:2").clip(0.5).release(0.1).gain(0.9).room(0.2).layer(p=>p.pan(1),p=>p.pan(0).late(.01)),\n  x=>chord(x).anchor("g5").voicing().s("gm_percussive_organ").gain(0.8).mask("<~@3 1@6 ~@3>/12").room(.4)\n    )\n\ndrm: "<~ 0 [0,1]@6 [1,2]@4 [0,1]@8 1@3 ~ >/6".pick([\n     s("<[~ hh]*2>"),\n     s("<bd sd [bd [~ bd]] sd [bd <~ bd>] [[sd bd] ~]>*2"),\n     s("<oh:2*8>")\n  ]).bank("RolandTR808").room(1).lpf(1800).gain(3.5)',
	},
	{
		name: "Disto",
		by: "eefano",
		code: 'setcps(90/60)\n\ng: n("<[[0,4]]*3>")\n  .scale("c#2:minor").s("supersaw").transpose("<0 2 [3 1]>/8")\n  .lpa(0).lpe(10).lpd(0.2).lpr(1).lpf("<[10 10 100]>").dist("8:0.18")\n\ns: n("<[[5 ~]*3] 4 4b 3 [1 2 1] 0 [4 5 2] 4 >")\n  .scale("c#4:minor").transpose("<0 2 [3 1]>/8")\n.s("supersaw").lpf(500).dist("10:0.12").room(0.2)\n  .mask("<0@3 1@4 >/8").hush()\n\nd: "[<bd*3 [~ bd bd] [sd ~ bd] [mt lt bd] [[sd,[~ sd@6]] sd mt] >,<oh!4 ~>,<cr>/5]"\n  .pickOut({bd:s("EmuDrumulator_bd").velocity(1).lpf(1000),\n           sd:s("EmuDrumulator_sd").velocity(1),\n           oh:s("EmuDrumulator_oh").pan(0.6).speed(0.7).velocity(0.2),\n           mt:s("EmuDrumulator_mt").velocity(0.6),\n           lt:s("EmuDrumulator_lt").velocity(0.6),\n           cr:s("SequentialCircuitsDrumtracks_cr").speed(1.3).pan(0.4).velocity(0.5)})\n  .room(0.9).gain(0.5)\n  .mask("<0 1@5 0 1 >/8")',
	},
	{
		name: "Edenontheair",
		by: "eefano",
		code: 'setDefaultVoicings(\'legacy\')\r\n\r\nconst chrds = "A@2 E@2 A F#m B@2 E@2 A ~ F#@4 A@2 ~ F#@4 ~@2".slow(25/4);\r\n\r\nstack(\r\nn(run(6).palindrome().fast(5)).clip(2).chord(chrds).anchor(chrds.rootNotes(5)).voicing().s("gm_electric_guitar_jazz"),\r\nchord(chrds).anchor("B4").voicing().s("gm_piccolo")\r\n             \r\n).gain("0.4@12 1@4 0.4@3 1@4 0.4@2".slow(25/4)).cpm(95/4).room(0.5)',
	},
	{
		name: "Elpueblo",
		by: "eefano",
		code: '// "El Pueblo Unido Jamas Sera Vencido" (work in progress)\n// song @by Inti-Illimani\n// script @by eefano\nsetCps(95/60/4)\nconst standardtuning = [40,45,50,55,59,64];\nconst fingering = \n{Am:"0:0:2:2:1:0",C:"x:3:2:0:1:0",Dm:"x:0:0:2:3:1",E7:"0:2:2:1:3:0",G7:"3:2:0:0:0:1",\n F:"1:3:3:2:1:1",A7:"x:0:2:2:2:3",E:"0:2:2:1:0:0",B7:"0:2:4:2:4:2"\n};\nconst sk = 300, sh = silence, strumming = \n{d: stack(0,timeCat([1,sh],[sk,1]),timeCat([2,sh],[sk,2]),timeCat([3,sh],[sk,3]),timeCat([4,sh],[sk,4]),timeCat([5,sh],[sk,5]))\n,u: stack(5,timeCat([1,sh],[sk,4]),timeCat([2,sh],[sk,3]),timeCat([3,sh],[sk,2]),timeCat([4,sh],[sk,1]),timeCat([5,sh],[sk,0]))\n};\n\nconst gString = register(\'gString\', (n, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+standardtuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=standardtuning) =>\n  (strums.pickRestart(strumming).pickOut(\n    [fingers.pickOut(fingering).gString(0),fingers.pickOut(fingering).gString(1),fingers.pickOut(fingering).gString(2)\n    ,fingers.pickOut(fingering).gString(3),fingers.pickOut(fingering).gString(4),fingers.pickOut(fingering).gString(5)]));\n\nstack(\n  guitar("<d [d@2 u]>*4",\n         "<0@4 1 2 1 3 4@2>/2".pickRestart(\n           ["<Am C Dm E7>*2","<Dm G7 C F>*2","<Dm E7 Am A7>*2","<Dm E7 [Am E7] Am>*2","<Dm B7 Am E7>"]))\n  \n    .s("gm_acoustic_guitar_steel:2").clip(1).release(0.4).gain(0.4).room(0.6),\n\n  "<~@2 0@2 1 2 1 3 4@2>/2".pickRestart([\n    "<0@5 0 2@5 2 4@2 4 3@2 2 1@5 <-3 4>>*12", \n    "<5@5 2 1@5 5 4@2 3 4@2 1 0@5 4>*12", \n    "<3@5 0 0b@5 3 2@2 1 2@2 3 4@2 4b 4@2 6>*12",\n    "<3@5 0 0b@5 3 2@2 1 0@2 0b 0@5 0>*12",\n    "<[3!2]@4 ~ 3 [3!2]@4 ~ 3 [4b@!2]@4 ~ 4b [4b!2]@4 ~ 4b [4!2]@4 ~ 4 [4!2]@4 ~ 4 [4!2]@4 ~ 4 [4!2]@4 ~ ~>*12",\n  ]).scale("a5:minor").note().clip(0.95).color(\'yellow\')\n   .layer(x=>x.s("gm_ocarina").gain(0.6).room(0.6)\n         ,x=>x.transpose(-24).attack(0.01).release(0.1).s("gm_choir_aahs:3").gain(0.8).room(0.5)),\n\n  "<0@2 ~@8>/2".pickRestart([note("<b@2 f@2 ~ b b@2 f@2 ~ b b@2 b b@b b@2 f@2 ~ <b ~>>*12")])\n      .clip(0.90).s("gm_applause:3").color(\'red\').room(2).gain(0.35)\n\n)//.pianoroll()',
	},
	{
		name: "Enjoythesilence",
		by: "eefano",
		code: '// "Enjoy The Silence (coda)"\r\n// song @by Depeche Mode\r\n// script @by eefano\r\nsetCps(113/60/4)\r\nawait samples({\'gtr\': \'gtr/0001_cleanC.wav\'}, \'github:tidalcycles/Dirt-Samples/master/\');\r\n\r\nconst melodia   = x => x.note().s("ocarina").gain(0.6).clip(1).release(0.1)\r\nconst guitar    = x => x.note().s("gtr").room(1).gain(0.25).clip(1).release(0.5)\r\nconst accordi   = x => x.note().s("recorder_bass_sus").gain(1.5).clip(1).release(0.5)\r\nconst basso     = x => x.note().s("triangle").gain(0.8).clip(1).sustain(0.8)\r\nconst ritmo     = x => x.bank("AlesisHR16").clip(1).gain(0.08)\r\n\r\nconst scala = cat(\'c minor\')  // IV VI I III\r\nstack(\r\n"<[3,5,0] [5,0,2] [0,2,4] [2,4,-1]>".scale(scala).apply(accordi),\r\n"<[2@3 3] [0@3 2] [4@3 6] [2@3 3] [0@3 1] [-1@3 -2] -3 [0 1]>".scale(scala).transpose(12).apply(melodia),\r\n"~@2 2 <7 9 6 6>@2 2 <8 6 4 4>@2".scale(scala).transpose(-12).apply(guitar),\r\n"<-4 -2 0 -1>".struct("[[x ~]!2 x x@0.5 [x ~]!2 x@0.5 [x ~]!2]").scale(scala).apply(basso),\r\ns("bd!4,[~ sd]!2,[~ hh!2 hh*2]!2").apply(ritmo),\r\n//s("hh!4").apply(ritmo)\r\n)',
	},
	{
		name: "Epicbiopic",
		by: "eefano",
		code: '// "Epic Biopic" version 1.0\n// song @by eefano\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\nconst toscale = register(\'toscale\', (pat) => pat.withValue((v)=>\n  v.endsWith(\'m\') ? [v.substring(0,v.length-1),\'minor\']:[v,\'major\']));\nsetCps(1)\norch: "<~ a@2 b a@2 b c@6 d@2 a@2 b e@2 f@9 i@6 g@4 h ~>/5".pickRestart({\n  a:"<B@3 Am F>", \n  b:"<F# C#@2 E@2>",\n  c:"<Fm@4:1 F#@2:1 A#@4:1>",\n  d:"<Fm@2:2 F@3:2 D#m:2 D@3:2 A:2>",\n  e:"<A@6 ~ Cm@3:4>",\n  f:"<G@2:4 B:4 F#m@2:4 A@2:4 Em@2:4 G:4 Dm:4 F@2:4 <Cm!2 [C F#]>@2:4>",\n  g:"<C#@2:2 Dm@2:2 D#@2:2 F@3:2 C#:2 G#@4:2 A#m@2:2 F@4:2>",\n  h:"<F@3 ~@2>",\n  i:"<[[Fm@4:1 F#@2:1 A#@4:1]!2]@20 [Fm@2:2 F@3:2 D#m:2 D@3:2 A:2]@10>"\n}).split([0,0],t=>stack(\n \n  chord(t[0]).anchor(\'c5\').voicing().s(t[1].pickOut([\n    "supersaw".lpf(5000).velocity(.9),\n    "triangle".velocity(.65),\n    "supersaw".lpf(4800).velocity(.51).attack(.05).release(.05),\n    "triangle".lpf("4000").velocity(.55)\n  ])).room(.4).gain(.75).color(\'yellow\'), \n  \n  n(t[1].pickRestart([\n    "<-1 [0 1]*3 0>".velocity(1.1),\n    "<1 0*3>".velocity(.7).lpf(2800),\n    "<[1 1*3] 2*3>","<[1 0] ~>".lpf(2500).velocity(.78)\n  ])).chord(t[0]).mode(\'root\').anchor(\'g2\').voicing().clip(.97).s("square").color(\'cyan\').gain(.85),\n\n  "<~@4 a@2 b ~@2 c@4 d@2 e ~@2 ~@2 f@6 i@3 c@4 d@2 g@4 h ~>/5".pickRestart({\n  a: "<~ [[5b 4 2]*2] [7 8b 7] [4 6b 4] [4 6] [[2 3] 4@7]@2 [~@3 6b*2] [6b@3 7*2] 9 >",\n  b: "<9*3 11 9*3 11@2>",\n  c: `<[2 1 0] [4@2 4*2] [4 ~ 0] [2@3 1 0@2] 2 [5@2 4] [2@3 1 2@2] [0 1] [2@3 1 2@2] [0@2 1]\n       [9@3 7*2] [7@2 7] [9@3 7*2] [4 ~ 0] [2@3 1 0@2] [7@3 6 7@2] [6 7] [7@3 6 7@2] [6 7] [7@3 6 7@2]>`,\n  d: "<[11 10] <[9 8] [9 10]> [9 8 7] [6 5 4]>",\n  e: "<2@2 ~@3>",\n  f: "<[[2 3] 4@2]!2 <[2] [4 3]> >".add("<0 [0,-2]>/15"),\n  g: "<[9@8 9]@2 7@2 [9@8 8 9]@2 9@3 [9@2 [10 11]] 9@3 [[9 7 9]!2] [9@5 9]@2 9@4>".add("<0@14 [0,-2]@6>"),\n  h: "<[11 ~]>/5".add("0,-2"),\n  i: "<[2 1 0] <[4@2 4*2]!2 4> <[4 ~ 0] 2*3 2> [2@3 1 0@2] 2 [4 3 2]>".add("<[0,-2]>/15"), \n    }).scale(t[0].toscale()).s("gm_tuba").clip(.9).note().color(\'magenta\').gain(1).room(.2)\n))\ndrums: "<x a@2 b a@2 b [c,k]@6 d@2 a@2 b e@2 f@9 [i,k]@6 g@4 h ~>/5".pickRestart({\n  a: s("<[[cr,lt]!2]@10>").lpf(2600),\n  b: s("<~ [[cr,lt]!2]@4>").lpf(2600),\n  c: s("<[lt ~ lt]>").lpf(200),\n  d: s("<[[cr,lt]!5]@10>").lpf(2600),\n  e: s("<[cr,lt]@5 [cr,lt] [lt mt*2 lt*2] lt@3>").lpf(2800),\n  f: s("<[lt mt lt]!30 [lt mt*2 lt*2]!13 lt*3 [lt mt*2 lt*2]>")\n        .lpf("<200@15 400@15 1000@13 1500@2>").velocity("<.9@28 1.2@2>"),\n  g: s("<[mt mt*2 mt*2]>,<[[cr,lt]!3]@6 [[cr,lt]!4]@8 [[cr,lt]!3]@6>").lpf(2600).velocity(.78),\n  h: s("<[[cr,lt]!2]@4 ~>").lpf(2800).velocity(.9),\n  i: s("<[lt mt*2 lt*2],<~@20 [cr!3]@6 [cr!2]@4>>").lpf("<1500 1800 2400>/10").velocity(.78),\n  k: s("<cr,lt>/30").lpf(2800).velocity(.45),\n  x: s("<[mt mt lt] lt>").lpf("<800@2 1200@2 2400>")\n}).bank("BossDR550").room(1.4).speed(.7).gain(.45)',
	},
	{
		name: "Eversoclosely",
		by: "eefano",
		code: '// "The Everso Closely Guarded Line (Coda)" - Work In Progress\n// song @by Cardiacs\n// script @by eefano\nsetCps(93.2/60*3/4/9)\nsetDefaultVoicings(\'legacy\')\nconst epic = "<D Dm Am D Gm C F Am A#>*9";\nconst mels ={0:"d4@2 a d4 g c4 f a d4"\n            ,1:"a@7 c4@3 d4@6 e4@2 c4@7 d4@2"\n            ,2:"a@7 e4 c4 [d4@3 e4]@2 f#4 ~ g4@2 [c4@3 d4]@2 e4 [c4@5 ~]@4 c5@2 ~ d5@2"\n            ,3:"a@2 f#4 f4@2 a ~ e4@2 d4@2 a ~ g4@2 c4@2 e4 ~ f4@2 c5@2 e4 ~ d4@2"\n            ,4:"a d4 f#4 [a4 e5 c5]@6 d5 a4 f#4 [a4 g4]@4 c5@3 a4 f4 [e4 c4]@4 d4@2"\n            ,5:"a d4 f#4 [a4 c5 a4]@6 d5 a4 f#4 [a4 g4]@4 c5@3 a4 f4 [e4 c4]@4 d4@2"\n            ,6:"f#4 f4 e4 f#4 g4 e4 f4 [a@2 c4] [[a#@3 c4]@2 d4]"\n            ,7:"[f#4 f4]@6 <e4 [e4 e4@2]>@3 [d4@3 e4]@2 f#4 [g4 a#4 c5 a4]@8 f4 e4 <[c5@2 ~ a#4@2] [c4@3 a#@2]>@5"\n            ,8:"[~@25 d4@29]/2"\n            ,9:"<0,1,2,3,4,5,6,7>*9"}\nstack\n("<0 1 2 3 4 0 1 2 3 [4@26 ~] 0 1 2 3 [[4@25 ~@29],8]@2 >".pickRestart(mels).sub(12).note().s("gm_overdriven_guitar").gain(.8)\n,"<~ ~ ~ ~ 5 5 6 7@2 [2@4 ~] 5 5 6 7 [[5@25 ~@29],8]@2>".pickRestart(mels).note().s("gm_tenor_sax").gain(.8).color("yellow")\n,"<1@14 [[4@25 ~@29],8]@2>".pickRestart(mels).add(24).note().s("gm_ocarina").gain(.3).color("red")\n,"<9@14 ~@2>".pickRestart(mels).n().chord(epic).anchor("C4").voicing().s("<gm_reed_organ@10 gm_church_organ:1@4 ~@2>").gain("<.25@10 .45@4 ~@2>").color("green").midichan(3)\n,"<0@14 [[4@25 ~@29],8]@2>".pickRestart(mels).sub(24).note().s("gm_electric_bass_finger").lpf(400).gain(.77).color("blue")\n,"<0 [0@2 1@2 0 2@4] 0!4 [0@2 1@2 0 2@4] 0!2 [0@26 ~] 0!2 [0@2 1@2 0 2@4] 0 3@2>".pickRestart(\n  ["<rd*3 , <<<bd!4 sd> sd> ~ bd>*3 , cr/9>*9"\n  ,"[[sd [bd,cr] ~]!2@3]*9/2"\n  ,"<[sd,[~ sd@10]] [[[bd,cr] ~]!2]@4 bd [sd,[~ sd@10]] mt lt >*9*3"\n  ,"< [<[sd,[~ sd@10]]!2 ~> <[bd,cr]!2 [sd,[~ sd@10]]> [bd,cr]!2 ~ [bd,cr] ~ [bd,cr,cr] ~]*3 ~*4 >" \n  ]).pickOut({rd:s(\'rd\').velocity(.12).hpf(9000).pan(.45),\n               bd:s(\'bd\').velocity(.5).lpf(2500),\n                sd:s(\'sd\').velocity(.5).hpf(200),\n                cr:s(\'cr\').velocity(.1).pan(.55),\n                mt:s(\'mt\').velocity(.3).pan(.6),\n                lt:s(\'lt\').velocity(.3).pan(.7)\n}).bank("Linn9000").speed(.95).gain(.7).color("cyan").midichan(10) ).room(.8)',
	},
	{
		name: "Happybirthday",
		by: "eefano",
		code: '// HAPPY BIRTHDAY\r\nsetDefaultVoicings(\'legacy\')\r\n\r\nconst chrds = "F@3 C@6 F@6 Bb@3 F@2 C F@3".slow(8);\r\n\r\nstack(\r\n"[C4@3 C4] D4 C4 F4 E4@2 [C4@3 C4] D4 C4 G4 F4@2 [C4@3 C4] C5 A4 F4 E4 D4 [Bb4@3 Bb4] A4 F4 G4 F4@2".slow(8).early(1/3).note().s("gm_harmonica").gain(0.4).color(\'green\'),\r\nchord(chrds).anchor("G4").struct("x*3").voicing().piano().gain(0.2).color(\'yellow\'),\r\nn("2 ~ ~ 2 1 ~").chord(chrds).anchor(chrds.rootNotes(2)).voicing().s("gm_electric_bass_finger").lpf(190).gain(1).color(\'blue\'),\r\n\r\ns("hh*3, <bd ~>, ~ ~ rim").bank("KorgDDM110").gain(0.2)\r\n              \r\n).cpm(120/4).room(0.3)//.pianoroll();',
	},
	{
		name: "Happybirthdayramones",
		by: "eefano",
		code: '// "HAPPY BIRTHDAY BURNSIE"\r\n// song @by Ramones\r\n// script @by eefano\r\nsetDefaultVoicings(\'legacy\')\r\n\r\nconst chrds = "F@3 C@6 F@6 Bb@3 F@2 C F@3".slow(8);\r\n\r\nstack(\r\n"C4*2 [D4 C4]@3 F4 E4 ~@2 C4*2 [D4 C4]@3 G4 F4 ~@2 C4*2 [C5 A4]@3 ~ [E4 D4]@3 Bb4*2 [A4 F4]@3 G4 F4 ~@2".slow(8).early(1/4).note().s("gm_distortion_guitar").gain(1).color(\'green\'),\r\n\r\nn("0,2").chord(chrds).anchor("E3").mode(\'root\').struct("[[x ~]*2 x*2]*2").voicing().s("gm_distortion_guitar").clip(0.95).gain(0.7).color(\'yellow\'),\r\nn("0").chord(chrds).anchor("E2").mode(\'root\').voicing().s("gm_electric_bass_finger").lpf(190).gain(1).color(\'blue\'),\r\n\r\n  s("<[~@5 crow crow ~]!2 ~ [~@3 crow crow ~@3 ]>").slow(2).gain(1.2),\r\n  \r\n  s("oh*4, <bd!3 [bd*2 ~]>*2 , [~ sd]*2").bank("Linn9000").gain(0.15)\r\n              \r\n).cpm(200/4).room(0.3)//.scope()//.pianoroll()',
	},
	{
		name: "Heymoon",
		by: "eefano",
		code: '// "Hey Moon" (work in progress)\n// song @by John Maus\n// script @by eefano\nsetcps(88/60)\n\nconst split = register(\'split\', (deflt, callback, pat) => \n  callback(deflt.map((d,i)=>pat.withValue((v)=>Array.isArray(v)?(i<v.length?v[i]:d):(i==0?v:d)))));\n\nc: n("<~ 1 2 3>*2").chord("<F C G F>/2").anchor("<F4 C4 G4 F4>/2").voicing().s("gm_pad_warm").release(2).room(0.6).gain(0.6)\n\nm: "<0@16>/2".pickRestart([\n  "<~!14 3 1 3@2 ~@4 0 5 4 4 4 [5 3@3]@2 ~!5 [1 0] -1b 0@2 0 [0 0] ~!14 >*2",\n  "<~!15 3 3@3 0 0@2 5@2 4@2 3 2 2 3 3 0 0  >*2"])\n .layer(x=>x.scale("g4:major").note().s("gm_piccolo").pan(0.4).room(1).gain(0.5),\n        x=>x.scale("g2:major").note().s("supersaw").pan(0.6).room(1).gain(0.6))\n\n\n$: s("<hh*2>").gain(0.3).room(1)\n$: s("<bd>/2").gain(0.1).room(1)\n$: s("<[~ <~!3 sd>] sd>").gain(0.3).room(1)',
	},
	{
		name: "Humanperformance",
		by: "eefano",
		code: '// "Human Performance" (work in progress)\n// @song by Parquet Courts\n// @script by eefano\nsetcps(110 / 60 / 2)\n\nconst song = "<0@2 1@11 1@11 1@6 2@3 3@24 4@4 1@11 1@11 1@6 2@3 3@24 4@4>"\n\nconst zero = register(\'zero\', (pat) => pat.withValue((v)=>0))  \n\nconst chseq = song.pickRestart(["~","<B@2 F#m@2 E@2 D@2 D A@2>","<B@3>".struct("x*4"),\n                           "<A@3 <F#m!2 E D B F#m E D>@9>*4".struct("x*4"),"<F#m@4>"])\n\nconst cs = zero(chseq).pickRestart(["<[0,[~ 1@40],[~@2 2@40],[~@3 3@40]]@2>"])\nconst ds= "<0@3 0@2 0 0@2 0!2 0@2>*4".pickRestart(["[0,1,2,3]"])\n\nconst cln = x=>x.s("gm_electric_guitar_clean:2").lpf(1800).gain(.7)\nconst dst = x=>x.s("gm_electric_guitar_clean:2").hpf(100).lpf(1800).clip(1).gain(.7)\n\n\n$: n(song.pick([cs,cs,ds,ds,cs])).chord(chseq).mode(\'above\').anchor(\'e3\')\n  .voicing().mode("root").pickF(song,[cln,cln,cln,dst,cln])  ._pianoroll()\n\n$: n(song.pickRestart(["~", "<~ 8 8 7 9 8 ~ ~ ~ 7 7 5 8 7 ~ ~ ~ 8 8 7 9 8 7 6 7 5 ~ 4 7 5 ~ ~ ~ 7 7 6 7 2@2 ~@5>*4",\n                       "<7@2 ~ [7 5] [9 7]@2 ~@100>*4",\n                       "<<[12!2 11 12]!2 [9!3 8] [9 8 7 9] [9!3 8] [9 8 7 9] [9!3 8] [9 8 7 9]> ~@2>","~"]))\n  .scale("a2:major").s("gm_tenor_sax:1").gain(1).color(\'yellow\')\n\n$: n(song.pickRestart(["<~ [~ 0 2 2b]>",\n                       "<1 [4b 4] 5 [2 5] 4 [1 4] [3@3 3] [0@3 0] [-4@3 -4] [0 0] [0 0 2 2b]>",\n                       "<1>*4","<<0!2 2 0!2 2 0!2>@3 <-2!2 4 3 1 -2 4 3>@9>*4".struct("x*4"),"<5!4 2!4 -2!3 2 5 -2 2 2b>*4"]))\n  .scale("a2:major").s("gm_electric_bass_finger:3").clip(.97).lpf(350).gain(1).color(\'cyan\')\n\n$: song.pickRestart(["<~>","<rd*4,[bd sd]>","<rd*4,[sd bd]*2>",\n                     "<cr@3 cr@9>*4,<sd ~ bd sd ~ sd!7>*4","~"]).pickOut({\n          rd:s("<r8_rd:1>").speed(1.1).hpf(4000).velocity(.1),\n          bd:s(\'linn9000_bd\').velocity(.55).lpf(500),\n          sd:s(\'linn9000_sd\').velocity(.55).hpf(200),\n          cr:s(\'linn9000_cr\').velocity(.1).pan(.55),\n          mt:s(\'linn9000_mt\').velocity(.3).pan(.6),\n          lt:s(\'linn9000_lt\').velocity(.2).pan(.7)}).speed(.94).gain(.6) .color(\'magenta\')\n\nall(x => x\n     .room(.3)\n    //.ribbon(24*2,1*8)\n)',
	},
	{
		name: "Hydraswap",
		by: "eefano",
		code: 'await initHydra() \n\nlet bass = note("<C3 Eb3 G2 Bb2>").euclid(3,8).s("sawtooth").lpf(sine.range(400, 1000))\nlet kick = s("<[bd ~ ~ bd]!3 [bd(5,8,1)]> ")\nlet hihat = s("hh!6 [hh*2 hh]!2").slow(2)\nlet final = stack(note("c3@4, c2@4").s("sawtooth").lpf(1000), \n                  s("cr")).delay(.5).delaytime(".75")\nlet silence = s("bd").hush()\n\nlet sequence = "0@4 1@4 2@8 3 4@7".slow(24)\n\nsolid(0,0,0)\n.add(osc(10, 0.1, 10)  ,H(sequence.pick([1,0,0,1])))\n.add(noise()           ,H(sequence.pick([0,1,0,1])))\n.add(shape()           ,H(sequence.pick([0,0,1,0])))\n.out()\n             \nsequence.pick([ bass,                   // = 0\n                stack(bass, kick),      // = 1\n                stack(bass,kick,hihat), // = 2\n                final,                  // = 3\n                                silence])               // = 4',
	},
	,
	{
		name: "Ilredelmondo",
		by: "eefano",
		code: '// "Il Re Del Mondo (intro)"\r\n// song @by Franco Battiato\r\n// script @by eefano\r\nsetCps(91/60/4)\r\nconst accordi   = x => x.note().s("recorder_tenor_sus").clip(1).release(0.5)\r\nconst melodia   = x => x.note().s("sax").gain(0.3).clip(1).release(0.5)\r\nconst walking   = x => x.note().s("triangle").clip(1).release(0.1)\r\nconst ritmo     = x => x.bank("YamahaRY30").clip(1).gain(0.08)\r\nconst scaleggio = x => x.piano().gain(0.2)\r\n\r\nconst myscale = "[e:major e:minor]!3 [e:major]@0.5".slow(14)\r\n\r\nconst scala2 = "<e:major e:minor>".slow(2.5)\r\n\r\nconst verse = stack(\r\n"[4 5 6 7]*2".scale(scala2).note().apply(scaleggio),  \r\n"[0@4 [7 ~]!2 0@3 7@2 ~ 7 ~ 0@3 7@3]/2.5".scale(scala2).transpose(-12).apply(walking),\r\ns("hh!4").apply(ritmo),\r\n"<-3,-2,-1,0,1,2,3 ~@1000>".scale(myscale).velocity(0).apply(melodia).color(\'black\')\r\n)\r\n\r\nconst chorus = stack(\r\n"[0,2,4]/2".scale(myscale).apply(accordi),\r\n"[-3@3 -2 -1@3 0 -1@8 0@3 1 2@3 3 2@8 2@8 2@8 1@8]/14".scale(myscale).transpose(12).apply(melodia),\r\n"~ -3 [0 ~] [0 ~] [1 ~] [1 ~] [2 3] [4 ~] ".scale(myscale).apply(walking),\r\ns("[[bd [sd [~ bd]] [bd bd] sd,hh!7 oh]!13 [bd sd sd*4 lt*4,hh!3 oh ~!4]]/14").apply(ritmo),\r\n)\r\n\r\narrange([10,verse],[14,chorus])',
	},
	{
		name: "Jitterbug",
		by: "eefano",
		code: '// "Jitterbug (Coda)"\r\n// song @by Cardiacs\r\n// script @by eefano\r\nsetDefaultVoicings(\'legacy\')\r\nconst m1 = `f#4@3 d4@4 g4@6 g#4@4 f4@3 d#4@3 e4@4 c#4@6 b3@4 g#3@3 g#4@5 a4@4 f#4@3 d#4@3 f#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1 d#4@3`.slow(82/8);\r\nconst m2 = `f4@3 d4@4 d#4@5 e4@3 g4@4 e4@6 f#4@4 c4@2.9 ~@0.1 c4@3 g#3@4 a#3@4 b3@6 c#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1`.slow(73/8);\r\nconst m3 = `d#4@3 f#4@3.5 ~@0.5`.slow(7/8);\r\nconst m4 = `c#4@4 f#4@4 `.slow(8/8);\r\nconst m5 = `e4@4 g4@7.9 ~@0.1 f4@4 f#4@4.9 ~@0.1 d#4@3 e4@4 c#4@6.9 ~@0.1 f#4@2 f4@3.9 ~@0.1`.slow(41/8);\r\nconst melody = arrange([82/8,m1],[73/8,m2],[7/8,m3],[82/8,m1],[8/8,m4],[73/8,m2],[41/8,m5]);\r\n\r\nconst h1 = `D@2 G@2 C D#@2 G#@2 C# B@2 E@2 A F#m@2 B@2 G#@2 C#@2 A@2 D Cm@2 F#@2 D# Em@2 A@2 F# D#m@2 G#@2`.slow(40/4);\r\nconst h2 = `Cm F@2`.slow(3/4);\r\nconst h3 = `Bm@2 B@2 C@2 G@2 C A@2 D@2 Am C@2 G#@2 F#@2 E B@2 C#m@2 D# Em@2 A@2 F# D#m@2 G#@2`.slow(35/4);\r\nconst h4 = `Cm F#@2`.slow(3/4);\r\nconst h5 = `Cm F#@4 F@2`.slow(7/4);\r\nconst h6 = `C#m@2 D#@4 C#@2 F#@2 B@2 E@2 C#m@2 F#@2 A#@2`.slow(20/4);\r\nconst chords = arrange([40/4,h1],[3/4,h2],[35/4,h3],[3/4,h4],[40/4,h1],[7/4,h5],[35/4,h3],[20/4,h6]);\r\n\r\nstack(  \r\n n(stack("0","1".late(.1),"2".late(.2)).fast(4)).chord(chords).anchor("G5").voicing().s("gm_pad_choir").echo(2,1/6,.7).gain(0.8), \r\n chords.rootNotes(2).note().s("gm_lead_2_sawtooth").attack(0.2).sustain(1.2).lpf(1000).gain(0.4),\r\n melody.note().s("gm_lead_1_square").attack(0.02).sustain(1.5).lpf(1200).gain(0.75),\r\n s("<rd*4>").bank(\'LinnDrum\').gain(0.07)\r\n).cpm(115/4)\r\n.room(    slider(0.91,0,10))\r\n  .rsize(   slider(4,0,8,1))',
	},
	{
		name: "Jitterbugreverse",
		by: "eefano",
		code: '// "Jitterbug (Coda)" - In Reverse\n// song @by Cardiacs\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nconst melody = \n  `f#4@3 d4@4 g4@6 g#4@4 f4@3 d#4@3 e4@4 c#4@6 b3@4 g#3@3 g#4@5 a4@4 f#4@3 d#4@3 f#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1 d#4@3\n   f4@3 d4@4 d#4@5 e4@3 g4@4 e4@6 f#4@4 c4@2.9 ~@0.1 c4@3 g#3@4 a#3@4 b3@6 c#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1\n   d#4@3 f#4@3.5 ~@0.5\n   f#4@3 d4@4 g4@6 g#4@4 f4@3 d#4@3 e4@4 c#4@6 b3@4 g#3@3 g#4@5 a4@4 f#4@3 d#4@3 f#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1 d#4@3\n   c#4@4 f#4@4\n   f4@3 d4@4 d#4@5 e4@3 g4@4 e4@6 f#4@4 c4@2.9 ~@0.1 c4@3 g#3@4 a#3@4 b3@6 c#4@4 g4@6 a4@4 a#4@6 d#4@3.9 ~@0.1\n   e4@4 g4@7.9 ~@0.1 f4@4 f#4@4.9 ~@0.1 d#4@3 e4@4 c#4@6.9 ~@0.1 f#4@2 f4@3.9 ~@0.1`\n  .rev();\nconst chords = \n `D@2 G@2 C D#@2 G#@2 C# B@2 E@2 A F#m@2 B@2 G#@2 C#@2 A@2 D Cm@2 F#@2 D# Em@2 A@2 F# D#m@2 G#@2\n  Cm F@2\n  Bm@2 B@2 C@2 G@2 C A@2 D@2 Am C@2 G#@2 F#@2 E B@2 C#m@2 D# Em@2 A@2 F# D#m@2 G#@2\n  Cm F#@2\n  D@2 G@2 C D#@2 G#@2 C# B@2 E@2 A F#m@2 B@2 G#@2 C#@2 A@2 D Cm@2 F#@2 D# Em@2 A@2 F# D#m@2 G#@2\n  Cm F#@4 F@2\n  Bm@2 B@2 C@2 G@2 C A@2 D@2 Am C@2 G#@2 F#@2 E B@2 C#m@2 D# Em@2 A@2 F# D#m@2 G#@2\n  C#m@2 D#@4 C#@2 F#@2 B@2 E@2 C#m@2 F#@2 A#@2`\n  .rev();\n\nstack(  \n chord(chords).anchor("C5").voicing().s("gm_rock_organ").pan(0.4).gain(0.9), \n chord(chords).anchor("G5").voicing().s("gm_pad_choir").pan(0.6).gain(0.9), \n chords.rootNotes(2).note().s("gm_lead_2_sawtooth").attack(0.2).sustain(1.2).lpf(1000).gain(0.5),\n melody.note().s("gm_lead_1_square").attack(0.02).sustain(1.5).lpf(1200).gain(0.75),\n).cpm(115/183).room(    slider(0.91,0,10)) .rsize(   slider(4,0,8,1))',
	},
	{
		name: "Lovegoeson",
		by: "eefano",
		code: '// "Love Goes On" (work in progress)\n// song @by The Go-Betweens\n// script @by eefano\nconst standardtuning = [40,45,50,55,59,64];\n\nconst fingering = \n{Am:"0:0:2:2:1:0",C:"x:3:2:0:1:0",\n D:"x:0:0:2:3:2", Dm:"x:0:0:2:3:1",\n G:"3:2:0:0:0:3", G7:"3:2:0:0:0:1",\n F:"1:3:3:2:1:1", A7:"x:0:2:2:2:3",\n E:"0:2:2:1:0:0", Em:"0:2:2:0:0:0", E7:"0:2:2:1:3:0",\n B7:"0:2:4:2:4:2",Bm:"0:2:4:4:3:2"\n};\nconst sk = 300, sh = silence, strumming = \n{d: stack(0,timeCat([1,sh],[sk,1]),timeCat([2,sh],[sk,2]),timeCat([3,sh],[sk,3]),timeCat([4,sh],[sk,4]),timeCat([5,sh],[sk,5]))\n,u: stack(5,timeCat([1,sh],[sk,4]),timeCat([2,sh],[sk,3]),timeCat([3,sh],[sk,2]),timeCat([4,sh],[sk,1]),timeCat([5,sh],[sk,0]))\n};\n\nconst gString = register(\'gString\', (n, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+standardtuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=standardtuning) =>\n  (strums.pickRestart(strumming).pickOut(\n    [fingers.pickOut(fingering).gString(0),fingers.pickOut(fingering).gString(1),fingers.pickOut(fingering).gString(2)\n    ,fingers.pickOut(fingering).gString(3),fingers.pickOut(fingering).gString(4),fingers.pickOut(fingering).gString(5)]));\n\nsetcps(150/60)\n\nstrum:\n  guitar("<d@2 d u@2 u d u >*2",\n         "<0@2>/16".pickRestart(\n           ["<Am Em Bm C G Em D C>/4"]))\n    .s("gm_acoustic_guitar_steel:2").clip(1).release(0.4).gain(0.4).room(0.6)\n\nvoice:\n    "<0 1>/16".pickRestart([\n    "<2 2@2 2@2 2 2 2@2 1@2 ~@5 3 3@2 3@2 1 1@2 2@2 ~@6>*2",\n    "<3 1@2 -1@2 -1 -1 0@2 1@2 ~@5 0 0@2 0@2 1 1@2 -1@4 ~@4>*2"\n  ]).scale("a3:minor").note().clip(0.95).color(\'yellow\')\n   .s("gm_bassoon:2").gain(1).room(0.4)',
	},
	{
		name: "Madeallup",
		by: "eefano",
		code: '// "Made All Up (wip)"\n// song @by Cardiacs\n// script @by eefano\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\nsetCps(138/60)\nconst sequence = "<a@38 b@38 c@48 d@16 e@30 a@38 b@38 c@48 d@16 e@18 e@30>";\norch: sequence.pickRestart({\n  a: `<C!2 [C B] B [B D] D!2          F!2 [F C] C [C D#] D#     A#!2 [A# F] F!2  D#!2 [D# A#] A# F!2 \n       G#!2 [G# D#] [D#@3 F]@2 F C   G!2 [G D] [D@3 E]@2 E B>`,\n  b: `<C#!2 [C# Fm] Fm [Fm A#] A# D#  F#!2 [F# C#] C# [C# E] E  B!2 [B F#] F#!2  E!2 [E B] B F#!2 \n       A!2 [A E] [E@3 F#]@2 F# C#    G#!2 [G# D#] [D#@3 F]@2 F C>`,\n  c: `<E@6 B!2>`,\n  d: `<D#@6 G#m!2 E@6 B!2 >`,\n  e: `<[F# D A]@6 [[[C#:1 ~]!2 [C#:1:-2 ~]!2 [C#:1:-4 ~]!2]!4]@24>`\n}).split([0,0,0],t=>stack(\n \n  chord(t[0])\n  .anchor(sequence.pickRestart(\n    {a:"<b4@7 b4@6 b4@5 c5@6 d5@7 c#5@7>",\n     b:"<c5@7 c5@6 c5@5 c#5@6 d#5@7 d5@7>",\n     c:"<c4>",d:"<c4>",e:"<g5>"\n    })).voicing().s("gm_piano").room(.4).gain(.9).color(\'yellow\')\n  .superimpose(x=>x.late(0.1).attack(.1).velocity(.7).pan(.2)), \n\n  n(t[1].pickRestart(["<0>/8","<[0 ~]>"])).chord(t[0]).mode(\'root\').anchor(\'e2\').voicing()\n  .transpose(t[2]).s("gm_electric_bass_finger").lpf(200).gain(1.4).color(\'cyan\')\n).rsize(4)\n)\nconst choirline = note(`<c4@2 c4!3 b3 b3@2 b3 a3 [a3!2]@4\n                   [c4!2]@4 c4!2 c4@2 c4 d#4 d#4@2\n                   [f4!2]@4 f4 c4 [c4!2]@4\n                   d#4@2 f4@2 f4 c4 c4@2 a#3@2 d#4@10 ~@20>*2`);\nconst mode1 = x => x.adsr([0,.1,.8,0]).clip("0.92")\n  .superimpose(x=>x.transpose(12).velocity(.8).speed(1.002).pan(.4),\n               x=>x.transpose(24).velocity(.4).speed(.998).pan(.6));\nconst mode2 = x => x.attack(.04).release(.02).clip("0.85");\nchoir: sequence.pickRestart({\n  a: mode1(choirline),\n  b: mode1(choirline.transpose(1)),\n  c: mode2(note(`<~ b4@2 g#4@2 a#4@2 f#4 ~ g#4@2 a#4@2 b4@2 d#5\n       ~ f#5@2 a#4@2 e5@2 d#5 ~ c#5@2 b4@2 a#4@2 ~>`)),\n  d: mode2(note(`<~ a#4@2 g4@2 c5@2 b4 ~ a#4@2 f#4@2 g#4@2 ~>`)),\n  e: mode2(note(`<~ c#5@2 d5@2 c#5@8 ~@18 >`))\n}).s("triangle").gain(0.9).lpf(5000).color(\'magenta\').room(.5).rsize(4)//.pdec("<0@23 1@15>")\n  \nconst tricky = "<0@7 0@6 0@4 0 0@6 0@7 0@7>"\n    .pickRestart(["<cr,<bd [sd@3 sd] [bd bd] sd [bd bd] [sd bd] sd>>"]);\ndrums: sequence.pickRestart({\n  a: tricky, \n  b: tricky,\n  c:"<cr/16,rd,<[<bd ~> <~ bd>] sd>>",\n  d:"<cr/16,rd,<[<bd ~> <~ bd>] sd>>",\n  e:"<[rd!3]@6 sd!22 sd*4@2>"  \n}).pickOut({\n  bd: s(\'bd\').lpf(800).velocity(1.1),\n  sd: s(\'sd\').velocity(.7),\n  rd: s(\'rd\').velocity(0.3).hpf(8000),\n  cr: s(\'cr\').speed(0.7).velocity(0.1).hpf(6000),\n}).bank("Linn9000").room(0.4).gain(0.5).rsize(4)',
	},
	{
		name: "Magicandecstasy",
		by: "eefano",
		code: '// "Magic And Ecstasy (Exorcist II OST)" (wip)\n// song @by Ennio Morricone\n// script @by eefano\nsetcps(145/60)\nconst song ="<[b,x] [b,o]@2 [b,c]@2 [b,f]@2 [b,o]@2 [b,f]@2 [b,c]@2 [b,o]@2 [b,c]@2>/24"\n  \norchestra: song.pickRestart(\n{b:`<[a2 [a2 b2] a2 [a2 c3] a2 [a2 d3] [d#3 d3] [c#3 d3] d#3 [d3 c#3] [d3 d#3] [d3 c#3]]!2\n     [[a2:.9 b2:.9] [c3:.9 d3@3]@2 d#3 [d#3:.9 d3:.9] [c#3:.9 d3@3]@2 a2\n      [a2:.9 b2:.9] [c3:.9 d3@3]@2 d#3 d3 c#3 a2@2 d#3 d3 c#3 d3 c#3@2 c#3@2]@2 >/12`\n  .as("note:clip").release(.05)\n  .layer(x=>x.s("gm_overdriven_guitar:6").hpf(500).lpf(2500).gain(1.2).pan(.51),\n         x=>x.s("gm_electric_bass_finger").transpose(-12).lpf(400).gain(.9).pan(.49))\n\n,o: stack(note(`<[~ c4] [a3 b3] c4 d4 d#4 f4 f#4 f4 g#4 f#4 f4 d#4 \n                 [[f4 d#4] a3] b3 c4 d4 d#4 f4 f#4 g#4 c5 c#5 [[d#5 d5] a4] d5 \n                 c#5 c5 a4 [[d#4 d4] a3] d5 c#5 c5 a4 d#5 d5 c#5 d5 \n                 [[d#5 d5] a4] d5 c#5 d5 c#5 a4 d#4 d4 c#4 [d4 [a3 d4]] d#4 d4>`)\n           .layer(x=>x.piano().gain(.7),\n                  x=>x.s("gm_dulcimer").gain(.15),\n                  x=>x.s("gm_piccolo").gain(.25).transpose(12),\n                  x=>x.s("gm_violin").gain(.40)),\n          note("<~ ~ [~ a3]!10 ~ [~ a3]!14 ~ [~ a3]!17 ~ [~ a3]!2>").piano().gain(.5),\n          note("<a2>/12").fm(2).fmh(2).fmwave("sine").s("supersaw").speed(1.2).attack(.1).release(.1).gain(.25)\n        ).transpose(12).color(\'cyan\')\n\n,c: stack(note("<[d#5@2 d5@2 c#5@7 ~]!2 [d#5@2 d5@2 c#5@2 d5 ~ d#5@2 d5@2] [c#5@2 a4@10]>/12")\n          .layer(x=>x.s("gm_choir_aahs:1").patt(.1).penv(2).gain(1).pan(.45),\n                 x=>x.s("gm_choir_aahs:0").patt(100).penv(.2).gain(.9).pan(.55)).hpf(600)\n     ,note("<~@8 a3@4 ~@8 a3@4 ~@16 a3@8>").early(.05).s("gm_gunshot:3").hpf(1000).gain(2)).color(\'yellow\')\n\n,f: note(`<<[[a4 d#5] [d5 c#5] d5 [c#5@6 ~ a4]@2 [c#5@6 ~ a4]@2 [c#5@2 ~ a4] c#5@3 ~]\n            [[a4 d#5] [d5 c#5] d5 [c#5@2 d#5@4 ~ a4]@2 [d#5@6 ~ a4]@2 [d#5@2 ~ a4] d#5@3 ~]>\n            [[a4 d#5] [d5 c#5] d5 [c#5@2 a4@4 ~ c#5]@2 [a4@6 ~ c#5]@2 [a4@2 ~ c#5] a4@3 ~]>/12`)\n    .layer(x=>x.s("gm_flute:0").gain(.7).pan(.6),\n           x=>x.s("gm_flute:1").gain(.7).patt(1000).penv(-.5),\n           x=>x.s("gm_piccolo").gain(.2).transpose(12).pan(.4)).release(.05).hpf(500).color(\'magenta\')\n,x:"~"})\ntamb: s("tambourine*2").velocity(.8)\ndrums: song.pickRestart(\n  {b:"~",x:"<0@10 1@2 0@12>",o:"<2@24 3@8 2@8 4@8>",c:"<0@22 1@2 5@12 4@4 4@8>",f:"<0@24 3@4 3@4 0@8 4@8>"})\n  .pickRestart(\n  ["<cr@24,[~ <~ oh ~ oh ~ oh oh oh ~ oh oh oh>],<~ sd>,<bd ~ [~ bd] ~>>"\n  ,"<sd*2 [[sd ht] mt]>"\n  ,"<cr@24,<[rd <~ rd>]>,<~ [sd <~ [~ sx]>]>,<[bd <~ bd>] ~>>"\n  ,"<cr@4,<[bd sd] [sd ht] [ht mt] [[mt lt] lt]>>"\n  ,"<cr@8,<[bd@3 sd] sd*2 [sd@3 ht] ht*2 [ht@3 mt] mt*2 [mt@3 lt] [lt bd]>>"\n  ,"<oh!3 cr@3 cr@2>*2,<bd [sd bd] [~ bd] sd>"\n  ]).pickOut({\n          bd:s(\'bd\').velocity(.65).lpf(800),\n          sd:s(\'sd\').velocity(.55).hpf(200),\n          sx:s(\'sd\').velocity(.35).hpf(200),\n          cr:s(\'cr\').velocity(.12).pan(.55),\n          rd:s(\'rd\').velocity(.15).pan(.45),\n          oh:s(\'oh\').velocity(.08).pan(.55),\n          ht:s(\'ht\').velocity(.4).pan(.4),\n          mt:s(\'mt\').velocity(.4).pan(.55),\n          lt:s(\'lt\').velocity(.3).pan(.6).hpf(100)})\n  .speed(.94).bank(\'linn9000\').gain(.6)\n\nall(x => x.room(.3).postgain(1.6)\n    //.ribbon(9*24,1*48)\n    )',
	},
	{
		name: "Mammalschilling",
		by: "eefano",
		code: '// "Mammals Chilling" version 1.0\n// song @by eefano\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\nsetCps(155/60)\n\norch: "<a b@2 a [b@11 ~]@2 c e d c>/40".pickRestart({\n  a: "<<F:f3:h D7:g3:i> ~>/5",\n  b: "<F:f3:h@8 Em7:b3:i@12 C:f3:i@8 D7:g3:h@12>",\n  c: "<Bm7:b3:j@8 Em7:b3:k@8 F:g3:j@8 C:f3:k@8 G7:b3:j@4 G7:b3:l@4>".velocity(1.4),\n  d: "<Bm7:b3:j@8 Em7:b3:k@8 F:g3:k@8 C:f3:k@8 D7:f3:j@8 >".velocity(1.6),\n  e: "<<F:f3:h Em7:b3:i C:f3:h D7:g3:i> ~>/5".velocity(1.3),\n}).split([0,0,0],s=>stack(\n   n(s[2].pickRestart({\n     h:"<~ [<0@2 2 1>@3 ~]>*2", i:"<~ [<3@2 0 1>@3]>*2",\n     j:"<0 2>/2", k:"<1 <0 2>>/2", l:"<2 ~>/8"\n  })).chord(s[0]).anchor(s[1].transpose(-22)).mode(\'above\').voicing()\n    .s("gm_pizzicato_strings:4").gain(1.35).color(\'green\'),\n\n   n(s[2].pickRestart(\n     {h:"<[[0,[~ 1@40],[~@2 2@40],[~@3 3@40]] ~@2]>/2",\n      i:"<[[3,[~ 2@40],[~@2 1@40],[~@3 0@40]] ~@2]>/2",\n      j:"<[[~ 0@3],[~@1 1@3],[~@2 <2 3>@2],[~@3 <3 2>]]>/2",\n      k:"<[[~ 3@3],[~@1 2@3],[~@2 <1 0>@2],[~@3 <0 1>]]>/2",\n      l:"<[[1,[~ 2@30],[~@2 3@30],[~ 0]]]>/4"}))\n  .chord(s[0]).anchor(s[1]).mode(\'above\').voicing()\n    .s("gm_acoustic_guitar_nylon").gain(.65).color(\'yellow\')\n)).room(.2)\n\nmelo: "<~ a b ~@2 c d e ~ d>/40".pickRestart({\n  a: n(`<~ 4 0 ~ 1 0 ~ 1 2*3 ~@2 5 5 6 ~ 2 ~ 5 2 5 ~ 2 ~@5 6 ~ 2*3 ~@5 6 ~ 1*3 ~ [6*3]@2 \n      5 4 5 ~ 2 ~ 6 ~ 4 ~@3 4 ~ 3#!2 [2 0# 2]@2 3# ~ 4 ~ 3#!2 0# ~ 3# ~ 5!2 6!2 2 ~@6>*2`).late(.1),\n  b: n(`<~@4 2 ~ 3# ~ 4 ~@7 3# ~@5 7 ~ 8 ~@15 9*2 8 ~@14 8*2 6 ~@10 [4*3]@4 ~@6>*2`),\n  c: n(`<7 [9 13 12@2]@3 ~@2 [9 12 13 9 8 6]@4 ~@8 [9 12 13 9 8 6]@4 ~@8 [6 8 9 13 12 9]@4 ~@6>`),\n  d: n(`< ~ [~ 2] [~ 5] [~ 3#] ~@5 [~ 8] [~ 7] [~ 6] ~@8 [9*2 8] ~@7 [8*2 6] \n       ~@3 8*2 9*3 10#*4 9*5 6*3 6*4 5*5 ~>`),\n  e: n(`<~@10 12 12 13 ~ 9 ~ 12 9 12 ~ ~@32 [9 12 13 9 8 6]@8 ~@100>*2`).velocity(.5).pan(.3)\n}).scale(\'f4:major\').s("gm_marimba").room(.2).gain("<.65 .75 .85>").color(\'cyan\')\n\ntrom: "<~@2 b ~ a c d e ~ d>/40".pickRestart({\n  a: `<~ [2 ~] [6:1 ~] [4 ~] ~ [2 ~] [5:1 ~] [6 ~] [1@4 0# 1]@3  \n         [2 ~] [3# ~] ~ [3# 4] [4# ~] [5 ~] 7*2 6*2 5*2 [4 6:2@3]@2 4@3 \n         ~ 4*2 [3# 3] 2 ~ 2*2 [1# 1] 0# [3# 0# 2@2]@3 0# [3# 6 5@2]@3 >`.clip(.9),\n  b: `< ~ 2:3@5 6 ~ 4 ~ ~@4 2:3@2 1@6 9:1 ~ 8 ~ ~@6 9:1 8 ~@14 8:1 6 ~@10 [[0# ~]*3]@4 ~@20>*2`.clip(.9),\n  c: `<~@10 [[[-2 ~] [1 ~] 2 [-2 ~] [3# ~] ~]!2]@8 ~@4 \n            [[[3# ~] [2 ~] 1 [-1 ~] [2 ~] ~]!2]@8 ~@6 >`.clip(.9),\n  d: `<[2:3@5 5]@3 [~ 3#] [~@5 2:3@2 1@6 7]@7 [~ 8] ~@4 [9:1 8] ~@7 [8:1 6] \n       ~@7 1 2 3# 2:2 -1 ~ -2 ~>`.clip(.9),\n  e: `<~@30 0!2 -1!2 -2!2 -3 -1:2@3 -3@2 ~@10 [2 -2 -1 2 1 -1]@8 ~@100 >*2`.velocity(.5).pan(.7).clip(.4)\n}).split([0,0],t=>n(t[0]).scale(\'f3:major\').penv(t[1]))\n  .s("gm_trombone:4").room(.2).gain(.85).color(\'magenta\')\n\ndrums: `<[a,c]@4 [a,c,e]@7 [a,c,e,f] [v,a,b]@4 [[a,b,d]@11 g]@8 [v,a]@4 [~ a]!3 [~ h] [a,k]@4 a@4>/10`\n.pickRestart({\n  a:"<sh ~ sk sh ~ sk sh sk ~ sh sk ~ sh ~ sk sh ~ sk sh sk>*2",\n  b:"<~@8 [~ cw]!2>", c:"<~@8 [cw ~]!2>",\n  d:"<[<cm ~@3> [<cl ~>,<bd ~@7>]]>", e:"<<[<~ cl>@3 <cm,<~ bd> ~@3>]>@2>",\n  f:"<~@6 [[cj*3]!2]@4>",g:"<[~ cj!6 wh@5]@8>", h:"<cj*2 cl*2 ~ wx*2 vi>",\n  k:"<se@8 ~@2>",v:"<vi@40>"\n}).pickOut({\n  sh: s("shaker_small:0").velocity(3), sk: s("shaker_small:1").velocity(2),\n  cl: s("clave").velocity(7),          cm: s("clave").velocity(4).speed(.95),\n  bd: s("bongo:3").velocity(5),        cj: s("agogo").velocity(7),\n  cw: s("cowbell").velocity(1.2).pan("<.2 .8>/10"),\n  wh: s("ballwhistle"), wx: s("ballwhistle:1"),\n  vi: s("vibraslap").velocity(.9),\n  se: s("brown").adsr([1,0,1,1]).speed("<1.4 1.5>/10").pan("<.4 .6>/10")\n}).room(.2).gain(1)',
	},
	{
		name: "Markovchain",
		by: "eefano",
		code: 'let markovstates = {};\n                   \nlet markovtables = {\n  \'drums\':\n     //bd   sd    hh\n  [[  0,  .2,  .8],  // bd\n   [ .3,   0,  .7],  // sd\n   [ .9,  .1,   0]]  // hh\n\n, \'chords\':  \n  [[  .2,  .2,  .4,  .2],  \n   [ .5,   .3,  .2,  .1],\n   [  0,   .2,   .7,  .1],\n   [ .7,  .1,   .1,  .1]] \n }\n\nconst markov = register(\'markov\', (id, pat) => pat.withHap((hap)=> {   \n\n     if(markovstates[id]===undefined) markovstates[id]=[0];\n     const mystate = markovstates[id];\n     const mytable = markovtables[id];\n     //console.log(mytable)\n  \n     const p = hap.whole.begin.n;\n     while(mystate.length<=p)\n       {\n         const prev = mystate[mystate.length-1];\n         const t = mytable[prev];\n         let next = prev;\n         for(let i=0,j=t[i];i<t.length;i++,j+=t[i]) if(hap.value<j) { next = i; break; }\n         mystate.push(next);\n         //console.log(mystate);\n       }\n     return hap.withValue((v)=>mystate[p]);\n}))\n\n$: s(rand.segment(1).markov(\'drums\').pick(["bd","sd","hh"])).fast(8)\n\n$: chord(rand.late(.2).segment(1).markov(\'chords\').pick(["C","Dm","F","A"])).fast(2).voicing().piano()',
	},
	{
		name: "Mouthbreather",
		by: "eefano",
		code: '// "Mouth Breather" (work in progress)\n// composed @by The Jesus Lizard\n// script @by eefano\nsetcps(215/60*2)\n\nconst xposes = "<0@9 -5 -7 0@4 ~ 0@2 -5 -7 ~@2>/48"\ng:"<0@5 1 0 1 0@3 ~@2 0 ~ 0@4 ~@2 >/48".pickRestart(\n  [stack("<c3@9 c#3 c3@2>","<g3 f3@2 g3@4 f3 g3 g#3 g3 f3>".add("<0,5>")).struct("<x!4 ~!2 x!9 x@3 x!6>")\n  ,"<[c3,g3,c4]@6 ~@42>".add(-3).penv(-3).patt(1)\n  ]).note().transpose(xposes).s("gm_electric_guitar_clean:2").distort("10:.17").room(.1)\n\nb:"<~@3 0@2 ~ 0 ~ 0@6 ~ 0@4 ~@2 >/48".pickRestart(["<c2!3 c2@2 ~ c2!3 <[c#2 f2 c#2] [c2 f2 g2]>@3>"])\n  .note().transpose(xposes).s("gm_electric_bass_pick").release(.06).distort("5:.3").room(.2).color(\'green\')\n\nd:"<~ 0@14 ~ 0@6>/48".pickRestart(\n  [stack(s("<bd ~ bd ~!2 bd!2 ~!2 bd ~!2 bd ~!2 bd ~ bd ~ bd ~!2 bd ~>"),\n        s("<~!3 sd ~!6 sd ~!5 sd ~!3 sd ~!3>").gain(1.4),\n        s("<oh>/2").speed(1.03).gain(.3).pan(.4),\n        s("<cr>/12").speed(1.1).gain(.2).pan(.6))])\n  .room(.8).color(\'cyan\')\n\n// all((x)=>x.scope({scale:.05})) //._pianoroll({minMidi:10,maxMidi:60,autorange:false})',
	},
	{
		name: "Mouthbreathercomplex",
		by: "eefano",
		code: "// \"Mouth Breather\" (work in progress, complex variant)\n// composed @by The Jesus Lizard\n// script @by eefano\nsetcps(215/60*2)\nconst fvi = register(\'fvi\', (i, d, pat) => pat.filterValues(v=>v[i]==d))\nconst ati = register(\'ati\', (i, d, pat) => pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }));\n\n// Index0 = Instrument, Index1 = Part, Index2 = Transpose\n`<G@3 [G,D]@6 [G,D,B]@6 [G:1,D]@3 [G,D,B]@3 [G:1,D]@3 [G,D,B]@3 [G:0:-5,D,B:0:-5]@3 [G:0:-7,D,B:0:-7]@3 \n  [D,B]@6 [G,D,B]@3 ~ [G,D,B]@6 [G:0:-5,D,B:0:-5]@3 [G:0:-7,D,B:0:-7]@3 D@3 ~@3 >/16`\n.layer(  \n x=>x.fvi(0,\'G\').ati(1,0).pickRestart(\n  [stack(\"<c3@9 c#3 c3@2>\".pan(.51),\"<g3 f3@2 g3@4 f3 g3 g#3 g3 f3>\".add(\"<0,5>\").pan(.49)).struct(\"<x!4 ~!2 x!9 x@3 x!6>\")\n  ,\"<[c3,g3,c4]@3 ~@45>\".add(-8).penv(-3).patt(.6).lpf(3000)\n  ]).note()\n  .transpose(x.fvi(0,\'G\').ati(2,0))\n   .s(\"gm_electric_guitar_clean:2\").hpf(80).distort(\"10:.17\").room(.1)\n \n,x=>x.fvi(0,\'B\').ati(1,0).pickRestart(\n  [\"<c2!3 c2@2 ~ c2!3 <[c#2 f2 c#2] [c2 f2 g2]>@3>\"])\n  .note()\n  .transpose(x.fvi(0,\'B\').ati(2,0))\n  .s(\"gm_electric_bass_pick\").release(.06).distort(\"5:.31\").room(.2).color(\'green\')\n  \n,x=>x.fvi(0,\'D\').ati(1,0).pickRestart(\n  [\"<[bd ~ bd sd ~ bd!2 ~!2 bd sd ~ bd ~!2 bd sd bd ~ bd sd ~ bd ~],oh*12,cr*2>/24\"])  \n  .pickOut({bd:s(\'bd\').lpf(1800), \n            sd:s(\'sd\').speed(.88),\n            oh:s(\'oh\').speed(.9).velocity(.15).pan(.45),\n            cr:s(\'cr\').speed(.95).velocity(.2).pan(.55)\n          }).bank(\"linn9000\").gain(1.3).room(.85).color(\'cyan\') \n)",
	},
	{
		name: "Nudelimprov 1",
		by: "eefano",
		code: 'setcpm(120/4)\nlet key = "<c:major c:minor>/2";\nlet tra = "0, 3, 5".add("<0 [0 2]>/2");\n\n$: n("<6 3> - [2 <1 0>] <0*2 ->")\n.scale(key)\n.scaleTranspose(tra)\n.s("kawai")\n.lpf("<2000 1000 500>/2")\n.gain("<0 .3 .7@2>/8")\n\n\n$: n("<[2 -]*4 [0 -]*6>")\n.scale(key)\n.s("supersaw")\n.scaleTranspose(tra)\n.transpose("<0 -5>/8")\n.room(.5)\n.gain(.5)\n\n$: n("<0 0 0>").scale(key).transpose(-12)\n  .penv("<0 12 -12>")\n  .patt(.3)\n  .s("gm_fretless_bass")\n  .gain(1)\n\n$: s("white*16").clip(.5)\n.speed("<<1@2 1 2> <2 3>>*16")\n.hpa(.05).hpd(.05).hpe(3).hpf("<1000@2 2000 500>*8")\n.gain(0.4)\n\n$: s("<<bd bd*2> ~@14 <~@15 bd>>*8")\n.speed(1.2).lpf(1000).gain(0.6).room(1)\n\n$: \ns("- - [clap | -] clap*2:<0 4 5 1>").room(.6).gain(.5)',
	},
	{
		name: "Oddeven",
		by: "eefano",
		code: '// "Odd Even" (Work In Progress)\n// song @by Cardiacs\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nconst k = 0.01;\n\nstack(\n \n  n(stack("0@2 0 3@2 3 0 3",\n          "1@2 1 2@2 2 1 2".late(k),\n          "2@2 2 1@2 1 2 1".late(k*2),\n          "3@2 3 0@2 0 3 0".late(k*3)))\n     .chord("<G [Bm E] [G@3 C]>".slow(2)).voicing()\n     .s("gm_electric_guitar_jazz").clip(1).release(0.2).gain(0.5),\n     \n     \n     `< ~!4\n       [4 3 [2 ~] [1 ~] 0@2 4@2]\n       [4 3 [2 ~] [1 ~] 0@2 7@2]\n     >`.scale("g2:lydian").note().s("gm_bassoon")\n\n).cpm(120/4)//.pianoroll()',
	},
	{
		name: "Oh",
		by: "eefano",
		code: '// "Oh" \r\n// song @by Tim Smith Spratleys Japs\r\n// script @by eefano\r\nsetDefaultVoicings(\'legacy\')\r\nconst ln = 24;\r\nconst cresc = saw.range(0.4,0.7).slow(ln*2);\r\nconst chrds = "G#@4 F#@2 B@3 E A@2 D G@2 A G@4 A G@4 G# C# F# B E A@2 B A@2 C D#@6 F@2 D#@4".slow(ln);\r\nconst meldy = "[d#5@4 d#5@2 d#5@3 e5 c#5@2 d5 d5@2 c#5 b4@4 c#5 b4@4 c5 f5 a#4 d#5 g#4 e5 [b4@3 d#5] f#5 d#5@2 e5 g4 g5@3 f5 a5@4 a#5@3]".slow(ln);\r\nstack(     \r\n  meldy.note().s(\'gm_piccolo\').velocity(.9).gain(add(cresc,0.1)).color("yellow"), \r\n  \r\n  chord(chrds).anchor("C4".transpose(run(12).slow(ln))).voicing().s(\'gm_choir_aahs\').velocity(.8).pan(0.6).gain(add(cresc,tri.range(0,0.1).slow(ln))),\r\n  chord(chrds).anchor("C5".transpose(run(12).slow(ln))).voicing().s(\'gm_string_ensemble_2\').pan(0.4).gain(add(cresc,tri.range(0,0.1).slow(ln))),\r\n  \r\n  n("[0 1 2 3 4 3 4 5 4 3 2 3 2 1]*1.7").chord(chrds).anchor("C6").voicing().s(\'gm_oboe\').room(0.5).gain(0.2),\r\n  chrds.rootNotes("[1 2]!2").struct("x*8").clip(0.90).note().s(\'gm_electric_bass_finger\').lpf(280).gain(0.5),\r\n\r\n  s("[bd!2 ~ bd]*2").bank("AkaiLinn").lpf(300).gain(0.15),\r\n  s("<~ sd>*4").bank("AkaiLinn").hpf(250).lpf(3500).gain(0.30),\r\n  s("hh*8").hpf(8000).gain(0.08) \r\n).cpm(90/4).room(0.8) //.pianoroll()',
	},
	{
		name: "Oldmacdonald",
		by: "eefano",
		code: '// old mcdonalds has bad samples\r\nsetDefaultVoicings(\'legacy\')\r\nconst beast = ["crow","space","gm_bird_tweet","space:4","clash","space:1"]\r\nconst bsequ = "<~@2 0 ~@3 1 0 ~@3 2 1 0 ~@3 3 2 1 0 ~@3 4 3 2 1 0 ~@2>".pick(beast)\r\nconst chrds = "F [A# F] [F C] [F@3 ~]";\r\nconst strct = "[[x ~]!2] [[x ~]!2 x  ~]";\r\nconst bstrc = "[[~ x]!2] [[~ x]!2 ~  x]";\r\nconst trnsp = "<0!4 1!5 2!6 3!7 4!8 ~>";\r\n\r\n"<[0,3] [0,1] 2 0!2 [0,1] [2,1] 2 0!2 [0,1] [2,1]!2 2 0!2 [0,1] [2,1]!3 2 0!2 [0,1] [2,1]!4 2 [0@7 ~] ~>".pick(\r\n[stack(\r\n  "F5*2 [F5 C5] D5*2 C5 A5*2 G5*2 F5@2".note().clip(0.9),\r\n  chord(chrds).anchor("G4").voicing().struct("[~ x]*4 [[~ x]*2 [x@3 ~]]").gain(0.6),\r\n  n("[2 1]*4").chord(chrds).anchor("F2").voicing().struct("[x ~]*8").gain(0.6),\r\n ).piano().add(note(trnsp))\r\n,"~@7 [C5 D5]".note().clip(0.8).piano().add(note(trnsp)) \r\n,stack(\r\n  stack(\r\n  "[[F5*2 ~]!2] [[F5 ~]!2 F5*2 ~]".note(),\r\n chord("F").anchor("G4").voicing().struct(strct).gain(0.6),\r\n  "F2".struct(strct).note().gain(0.6)\r\n    ).clip(0.8).piano().add(note(trnsp)),\r\n "F".struct(bstrc).s(bsequ).release(0))\r\n \r\n,"0,1,2,3,4,5".pick(beast).gain(0) // samples preload trick\r\n]).cpm(140/8).room(0.4)',
	},
	{
		name: "Omalley",
		by: "eefano",
		code: '// "O\'Malley, Former Underdog" (work in progress)\n// song @by Deerhoof\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nconst crdpart = "<~@6 0@17 1@4 0@17 1@4 2@10>".pickRestart(\n["< C@2 D@2 [[C ~]!3 D@2 [D ~] D@2]@2 G@2 D@3 Am G D A D@2 >"\n,"< Em@2 D@2 >"\n,"< [G A] [[C ~]!3 D@2 [D ~] D@2]!3 D >/2"\n,"< G [D@6 G@10] >"\n]);\nstack("~"\n,"<0@6 1@17 2@4 1@17 2@4 3@2 ~@8>".pickRestart(\n["< <~ 0 1 2 3 4 5 6 7 4 5 6 7 8 9 10 11 7 8 9 10 11 12 13> ~>*8".sub(7)\n,"< ~@2 5 6 7@2 6 5 6 ~ 4 ~@3 8 ~@11 7 8 9@2 8 7 8 ~ 6 ~@3 11@4 10 9 10 ~ 8 ~ 9@2 8 7 8 ~ 6 ~ 7 6 5 ~ 6 ~ 4 ~@5 >*4"\n,"< 7@3 8 9@2 12@2 11@3 8 6@4 >*4"\n,"< 7@2 6@2 5 6 5 4 >*4"\n,"< 7 ~@7 6 ~@7 5 ~@2 5 ~ 5 4 ~@9 >*4"\n]).n().scale("g3:major").s("gm_lead_1_square").room(0.4).delay(0.4).dfb(0.3).dt(60/128).gain(0.65)\n\n,crdpart.chord().anchor("A4").voicing().s("gm_lead_8_bass_lead").room(0.4).color("blue").gain(0.5)\n\n,s("hh*2").bank("RolandTR909").room(0.2).color("yellow").gain(0.2)\n).cpm(147/2)',
	},
	{
		name: "Pumpupthejam",
		by: "eefano",
		code: '// "Pump Up The Jam" - Work In Progress\n// song @by Technotronic\n// script @by eefano\nconst pickRestart = register(\'pickRestart\', (arr, pat) => pat.pick(arr.map((x)=>x.restart(pat.collect().fmap(v=>v+1)))))\nconst as = register(\'as\', (mapping, pat) => { mapping = Array.isArray(mapping) ? mapping : [mapping];\n  return pat.fmap((v) => { v = Array.isArray(v) ? v : [v, 0];\n    return Object.fromEntries(mapping.map((prop, i) => [prop, v[i]])); }); });\nstack("~"\n,"<~@8 0@4 1@4 ~@8>".pickRestart(\n  ["[u [u e] a [u i] [u ~] [a u] [i a] [o@3 i] ~ [a e] [a i] [o@3 i] [~ u@2 a] [e e] [o i] [o@3 i]]/4"\n  ,"~ [u i] [u ~ ~ a] [i i@2 o]"\n]).vowel().s("z_sawtooth").clip(0.8).gain(1.4)\n             \n,"<~@16 0@8>".pickRestart(\n  ["[ ~@2 4 [5:1 ~] ~ [~ 0] [3:-1@5 3:1@2 2]@2 ~ [4@3:1 3 3@3 2 2@3 3 4:1@3 0 0@2 2:2@2]@5 [~ ~ 0@2 ~ 0@2 -2:-3]@2 ]/4"\n]).as("n:penv").scale("c4:minor").clip(0.90).patt("0.15").s("square").delay(0.3).dfb(0.3).dt(60/128).gain(0.7)\n            \n,"<0@32>".pickRestart(\n  ["[~@13 [[~@3 [0,-2,-4]@2 ~]@3 [0,-2,-4] [1,-1,-3]!2]@3 ]/4"\n]).scale("c4:minor").note().clip(0.7).s("z_sawtooth").color("red").adsr("0.07:.1:0.6:0.1").gain(0.5)\n\n,"<0@12 0 1 ~@2 3@8>".pickRestart(\n  ["[0 ~@23]/2"\n  ,"~@2 [~ [e2 ~]] [[0 2] ~]"\n  ,"[0 ~ ~ 0 ~ ~ 0 ~] <[[~ [0 1]] [2 ~]] ~>"\n]).scale("c2:minor").note().clip(0.9)\n      .layer(x=>x.s("z_sawtooth").delay(0.6).dfb(0.5).dt(60/125*3/4).pan(0.55).gain(0.8)\n            ,x=>x.s("z_square").lpf(300).lpe(2).lpa(-1.5).lpd(0.1).lpr(0.05).pan(0.45).gain(1)).color("green")\n\n,"<0@4 [0,1]@12 [0,1,2]@4 [0,1,2,3]@4>".pickRestart(\n [stack(s("oh*16").pan(0.45).gain("[0.08 0.16]*4").release(0),s("hh*4").pan(0.7).gain(0.20))\n ,s("bd*4").lpf(150).gain(1)\n ,s("[~ cp]*2").gain(0.5).pan(0.25)\n ,s("[~ rd]*4").gain(0.15).release(0).hpf(1500).pan(0.75)\n ,s("[~ sd!3]!4 [sd*4]!4").slow(2).gain(run(32).slow(2).mul(1/31).add(0.1).mul(0.4))\n ,s("cr").gain(0.2)\n ,s("bd").gain(0.8)\n ]).bank("RolandTR909").color("yellow").velocity(0.7)\n \n).cpm(124.5/4).room(0.3)',
	},
	{
		name: "Pyramidsong",
		by: "eefano",
		code: '// "Pyramid Song (wip)"\n// song @by Radiohead\n// script @by eefano\nsetcps(104/60/4)\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\n\nlet chr = {X:"f#2,c#3,a#3,c#4,f#4", Y:"g2,d3,b3,d4,f#4", Z:"a2,e3,a3,c#4,f#4", J:"g2,d3,b3,d4,g4", K:"f#2,c#3,a#3,c#4,g4",\n           V:"f#2,c#3,a3,c#4,f#4", W:"e2,b2,g#3,b3,f#4"}\n\npiano: "<[i1 i2 i3 i4] ooooh [v1 v2]!4 ooooh@2 [v1 v2]!3 [v1 v3] [v3 v2] [i1 i2 i3 i2] [i3 i2 i3 i2] end>/8".pickRestart(\n {i1:`<[[X:.6 X:.8]@3 Y:.5@2 [Z:.5 Z:.5]@3]>/2`, i2: `<[[Z:.4 Y:.4]@3 Y:.3@2 [J:.6 J:.9]@3]>/2`, \n  i3:`<[[K:.8 X:.6]@3 Y:.5@2 [Z:.5 Z:.5]@3]>/2`, i4: `<[[Z:.4 Y:.4]@3 Y:.4@2 [Y:.4 Y:.7]@3]>/2`,\n  ooooh:`<[[X X]@3 Y@2 [Z Z]@3] [[Z Y]@3 Y@2 [X X]@3] [[X X]@3 Y@2 [Z Z]@3] [[Z Y]@3 Y@2 [Y Y]@3]>/2`,\n  v1:`<[[X X]@3 Y@2 [Z Z]@3] [[Z Y]@3 Y@2 [X X]@3]>/2`,\n  v2:`<[[V V]@3 W@2 [W W]@3] [[Y Y]@3 Y@2 [Y Y]@3]>/2`,\n  v3:`<[[V V]@3 W@2 [W W]@3] [[Y Y]@3 X@2 [X X]@3]>/2`,\n  end:`<X:1>/8`, \n }).split([0,.5],(x)=>x[0].pickOut(chr).velocity(x[1])).note().piano().gain(0.8).room(.6)\n\nooooh: "<~ 0 ~@4 0@2 ~@8>/8".pickRestart([\n  "<f#5@11 e5:-2 g#5:4 e5:-4 [f#5:2 ~] [~ g#5 e5] f#5@4 g#5 f#5 e5 d5 c#5@5 ~@3>*4"\n  ]).split([0,0],(x)=>x[0].penv(x[1])).patt(0.04).s("triangle").attack(.08).release(.08).note().vmod(.1).vib(5).gain(0.3).lpf(2000).room(1.5)\n\ndrums: "<~@6 [~@15 0@15 1@2] [2,3]@8 3>/8".pick([\n  "<[bd,rd] ~ [~ sf*3] [bd,rd] ~ [~ sf*3] [bd,rd] ~ ~ [~ sf*3] [bd,rd] ~ [~ sf*3] [bd,rd] ~ [~ sf*3]>*8",\n  "<[sd sf bd] [sf sd sd]>*4",\n  "<[rd*4],[<~ ~ ~ bd ~ bd ~ ~ bd ~ bd ~ ~ bd ~ bd> <~!14 sf!2> <~ sd bd ~ sd ~ sd bd ~ sd ~ ~ sd ~ sd sd>]*4>",\n  "<cr,bd>/8",\n]).pickOut({\n  bd: s(\'bd\').bank(\'Linn9000\').lpf(1000),\n  sd: s(\'sd\').bank(\'RolandMT32\').velocity(.5),\n  sf: s(\'sd\').bank(\'RolandMT32\').velocity(.2),\n  rd: s(\'rd\').bank(\'Linn9000\').velocity(0.3).hpf(8000),\n  mt: s(\'mt\').bank(\'RolandMT32\'),\n  lt: s(\'lt\').bank(\'RolandMT32\'),\n  cr: s(\'cr\').bank(\'Linn9000\').speed(0.4).velocity(0.3).hpf(4000),\n}).room(.2).gain(0.5)',
	},
	{
		name: "Rhythmofthenight",
		by: "eefano",
		code: '// "The Rhythm Of The Night" - Work In Progress\n// song @by Corona\n// script @by eeefano\nsetDefaultVoicings(\'legacy\')\nconst as = register(\'as\', (mapping, pat) => { mapping = Array.isArray(mapping) ? mapping : [mapping];\n  return pat.fmap((v) => { v = Array.isArray(v) ? v : [v, 0];\n    return Object.fromEntries(mapping.map((prop, i) => [prop, v[i]])); }); });\n\nconst crdpart = "<~ 0@10 1@24 0@19>".pickRestart(\n["Ab Cm Bb F@2".slow(5)\n,"Bb@3 Ab@3 Cm@2".slow(8)\n]);\nstack \n("<0 1@4 0 1@4 ~@8 2 3@7 2 3@7 0 1@4 0 1@4 0 1@4 0 1@4>".pickRestart(\n  ["~ [4@3 ~]!3 7:5 6 4 3"\n  ,"2:-1 0:-2 ~@4 6:1 4:-1 6 4:2 ~@4 [4:2 3]@3 ~@6 4 7:5 6 [4@2 ~] [3:-1 2@3]@2 0 ~@2".slow(4)\n  ,"~@6 [6 ~]!2"\n  ,"6 5@0.5 [5 ~] [4 ~]!2 [3 ~] 3:2@1.5 ~@7 6@2 6:2 [5 ~ ]!2 4 3@2 4 2 0:-2 ~@7 [0 2]@3 3@2 4 6:4 4:-4 ~ 0 2 0 4 ~ 0 0:2@2 ~@7".slow(7)\n]).as("n:penv").scale("c4:minor").patt("0.07").s("gm_lead_1_square").room(0.4).delay(0.3).dfb(0.35).dt(60/128).gain(0.85)\n\n,crdpart.chord().anchor("F4").voicing().s("gm_synth_strings_1").color("blue").gain(0.4)\n\n,"<~@11 1@23 ~ 0@19>".pickRestart(\n  ["2 ~@2 2 ~@2 2 ~@3 2 ~@3 2 ~"\n  ,"[2 ~@2 2 ~@2 2 ~]!2"\n]).n().chord(crdpart).anchor(crdpart.rootNotes(2)).voicing().s("gm_synth_bass_1").lpf(1500).room(0.5).color("green").gain(0.9)\n\n,"<~@11 1@8 ~@16 0@19>".pickRestart(\n  ["<5 7 6 3!2> ~ 9 ~ 10 ~ ~ 12 ~ 11 ~ 10 ~ 11 9 ~"\n  ,"<6!3 5!3 7!2> ~ 9 ~ 10 ~ ~ 12 ~ 11 ~ 10 ~ 11 9 ~"\n]).scale("c3:minor").note().s("gm_lead_2_sawtooth").room(0.3).delay(0.3).dfb(0.5).dt(60/128*2).color("red").gain(0.6)\n\n,"<[2,3] ~@10 0@6 [0,1]@2 [0,2] 0@5 [0,1]@2 [0,2] 0@6 [2,3] 0@8 [0,1]@2 [0,2] 0@8>".pickRestart(\n [stack(s("bd*4").gain(0.8),s("[~ oh]*4").gain(0.14),s("hh*16").gain(0.09),s("[~ cp]*2").gain(0.4))\n ,s("[~ sd!3]!4 [sd*4]!4").slow(2).gain(run(32).slow(2).mul(1/31).add(0.1).mul(0.4))\n ,s("cr").gain(0.2)\n ,s("bd").gain(0.8)\n ]).bank("RolandTR909").room(0.2).color("yellow").velocity(1)\n \n).cpm(128/4)',
	},
	{
		name: "Satiesfaction",
		by: "eefano",
		code: '// "low Effort, high Satie\'sfaction"\n// song @by eefano\n\nsetcps(185 / 60)\nstack(\n  n("<0 1 2 [1 3 4] 5 4 [6 2 3] 1 4 0>/3".add("<7@24 14>/17")),\n  n("<[3,5,9] [2,5,9] [2,4,9]>/3".sub(7)).gain("<.35 .45 .25 .35>"),\n  n("<[5@3 4] 5>/8".sub(14).gain("<.7@9 .8>/10"))\n)\n  .scale("<b3:lydian c#4:locrian>/48").s("piano")\n  .postgain(sine.mul(.3).add(1.2).segment(48).slow(48 * 7))\n  .room(".8").clip(1)',
	},
	{
		name: "Shanghai",
		by: "eefano",
		code: '// "Shanghai" (work in progress)\n// composed @by King Gizzard\n// script @by eefano\n\nsetcps(81 / 60)\n\nshangai: n("<0 1 2 ~ 4 5 5 ~ 4 2 1 5 8 7 9!2 7 8 5 1 2 4 ~ 5!2 4 ~ 2 1 0 -7!8>*4").scale(\'ab4:major\').clip(.5).s("triangle").room(.8)\n\nchords: n("<[0,2,4]!4>".add("<0 1 0 1 -2 0>/8")).scale("<ab3:major@5 bb3:major@1>/8").piano().gain(.5)\n\nbass: n("<0@7 -4 0@6 0@4 -4 0@9 3@2 4@2>*4".add("<0 1 0 1 5 1>/8")).scale(\'ab1:major\').clip(.95).s("gm_electric_bass_finger").lpf(800)\n\nhh: s("<hh*4>").bank(\'9000\').speed(1.5).gain(.2)\nbd: s("<[bd@3 <~ bd>] ~>").bank(\'9000\').gain(.7)\nsd: s("<~ sd>").bank(\'9000\').gain(.7)',
	},
	{
		name: "Shedontusejelly",
		by: "eefano",
		code: '// "She don\'t use jelly" (work in progress)\n// composed @by The Flaming Lips\n// script @by eefano\nconst gString = register(\'gString\', (n,tuning, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+tuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=[40,45,50,55,59,64]) => (strums.pickOut(\n    [fingers.pickOut(fingering).gString(0,tuning),fingers.pickOut(fingering).gString(1,tuning),fingers.pickOut(fingering).gString(2,tuning)\n    ,fingers.pickOut(fingering).gString(3,tuning),fingers.pickOut(fingering).gString(4,tuning),fingers.pickOut(fingering).gString(5,tuning)]));\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\n\nsetCps(86 / 60 )\nconst fingering = \n{D5:"x:5:7:7:x:x",G5:"3:5:5:x:x:x",A5:"5:7:7:x:x:x",\n D:"10:12:12:11:10:10",C:"8:10:10:9:8:8",G:"3:5:5:4:3:3",A:"5:7:7:6:5:5"\n};\nconst sk = 300, sh = silence, strumming = \n{d: stack(0,timeCat([1,sh],[sk,1]),timeCat([2,sh],[sk,2]),timeCat([3,sh],[sk,3]),timeCat([4,sh],[sk,4]),timeCat([5,sh],[sk,5]))\n,u: stack(5,timeCat([1,sh],[sk,4]),timeCat([2,sh],[sk,3]),timeCat([3,sh],[sk,2]),timeCat([4,sh],[sk,1]),timeCat([5,sh],[sk,0]))\n};\nconst song = "<0 1@8 2>/4"\n\nlead: song.pickRestart(\n  ["<~ ~ ~ [~ c4:7:.5]>"\n  ,"<f#4 f#4*2 [a4:3:.1 f#4:-2:.1] [e4 f#4@2:3:.1 f#4]@2 f#4*2 [g4 f#4] [c#5:-2:.1 e4:2:1] >"\n  ,"<f#4 ~@3>"\n  ]).as("note:penv:patt").release(song.pickRestart([0,0,2]))\n  .s("gm_overdriven_guitar:11").color(\'magenta\').gain(.55).hpf(400).lpf(5000).pan(.5)\n\nrthm: song.pickRestart(\n  ["~"\n  ,"<D5:d [D5:d D5:u] G5:d [G5:d A5:u@2 A5:d]@2 [G5:d G5:u] [A5:d A5:u] [G5:d ~]>"\n  ,"<D5:d ~@3>"\n  ]).split([0,0],s=>guitar(s[1].pickRestart(strumming),s[0]).transpose(-12)\n  .release(song.pickRestart([.1,.1,2]))\n  .s("gm_overdriven_guitar:6").color(\'cyan\').hpf(700).lpf(6000)).gain(1.5).pan(.4)\n\nbass: song.pickRestart(\n  ["~"\n  ,note("<d2 d2*2 g1*2 [g1 a1@2 a1]@2 g1*2 a1*2 [g1 ~]>")\n  ,"~"\n  ]).s("gm_electric_bass_finger").color(\'green\').lpf(500).dist("4:.25")\n \ndrum: song.pickRestart(\n  ["~"\n  ,"<cr,[hh!15 oh],[bd sd bd*2 [sd bd] [~ sd] [bd ~] [sd bd] [bd sd]]>/8"\n  ,"<cr,bd>/4"\n]).pickOut({\n  bd:s(\'linndrum_bd\').hpf(50).lpf(2000).velocity(.8),\n  sd:s(\'linndrum_sd\').hpf(200).velocity(.7),\n  hh:s(\'linndrum_hh\').hpf(7000).speed(1.5).velocity(.3),\n  oh:s(\'linndrum_oh\').hpf(7000).speed(1.1).velocity(.3),\n  cr:s(\'linndrum_cr\').hpf(7000).speed(1.2).velocity(.3),\n}).color(\'yellow\').gain(1.2)\n\nall(x=>x.rsize(.8).room(1.3)\n  //  .ribbon(1*4,2*4)\n  )',
	},
	{
		name: "Sparky",
		by: "eefano",
		code: 'await samples({\'gtr\': \'gtr/0001_cleanC.wav\'}, \'github:tidalcycles/Dirt-Samples/master/\');\r\n\r\nconst melodia   = x => x.note().s("ocarina").gain(0.6).clip(1).release(0.1).color(2)\r\nconst guitar    = x => x.note().s("gtr").room(1).gain(0.20).clip(1).release(0.3)\r\nconst accordi   = x => x.note().s("recorder_bass_sus").gain(1.5).clip(1).release(0.5)\r\nconst basso     = x => x.note().s("gm_electric_bass_pick").gain(0.8).clip(1).sustain(0.8)\r\nconst ritmo     = x => x.bank("AlesisHR16").clip(1).gain(0.08)\r\n\r\nconst scala = "<c#4:major [f#4:major b3:major] [g#4:minor e4:major] [a4:major f#4:minor] [e4:major a4:major]>"\r\n  stack(\r\n "<[0,2,4]*2>".struct("[x ~]*4").scale(scala).apply(accordi),\r\n "<[4 2 0 4]*2 >".scale(scala).transpose(-12).apply(guitar),\r\n "-3".struct("[x ~]*4").scale(scala).transpose(-12).apply(basso),\r\ns("[sd,hh*2]!4").apply(ritmo),\r\n).cpm(120/4)',
	},
	{
		name: "Stacktricks",
		by: "eefano",
		code: 'stack("c","e","g")\n  \n    .withHap((hap)=>{ \n        hap.context.tempvalue=hap.value;\n        hap.value=hap.context.stacking===undefined?0:hap.context.stacking[0];\n        return hap;})\n    \n    .eq("<0 1 2>").filterValues((val) => val)\n    \n    .withHap((hap)=>{ \n        hap.value=hap.context.tempvalue;\n        delete hap.tempvalue;\n        return hap;})\n\n  .note().piano()',
	},
	{
		name: "Strangerthings",
		by: "eefano",
		code: 'setcps(0.7);\n\np1: n("0 2 4 6 7 6 4 2")\n  .scale("<c3:major>/2")\n  .s("supersaw")\n  .distort(0.7)\n  .superimpose((x) => x.detune("<0.5>"))\n  .lpenv(perlin.slow(3).range(1, 4))\n  .lpf(perlin.slow(2).range(100, 2000))\n  .gain(0.3);\np2: "<a1 e2>/8".clip(0.8).struct("x*8").s("supersaw").note();',
	},
	{
		name: "Strudelman",
		by: "eefano",
		code: '// "Strudelman will eat you"\n// @by eefano\nsetcps(1)\n\ndie: s("cr/16").late(666)\n  .bank(rand.range(0,3).pick(["RolandTR707","RolandS50","SequentialCircuitsDrumtracks","Linn9000"]))\n  .clip(rand.range(1,3))\n  .loop(1).loopBegin(.1)\n  .loopEnd(rand.range(.18,.3))\n  .speed(rand.range(.06,.10))\n  .pan(rand.range(.3,.7))\n  .gain(.2).attack(.5).release(3).color(\'black\')\n\ndoom: note("a1/8").late(333)\n  .s(rand.range(0,40).pick(["numbers:0","numbers:1","numbers:2","numbers:3","numbers:4",\n                            "numbers:5","numbers:6","numbers:7","numbers:8","numbers:9","~"]))\n  .speed(rand.range(.2,.3))\n  .gain(.9).color(\'black\')\n\npain: s(`<[RolandTR707_cr,RolandS50_cr,SequentialCircuitsDrumtracks_cr,Linn9000_cr,\n         numbers:0,numbers:1,numbers:2,numbers:3,numbers:4,\n         numbers:5,numbers:6,numbers:7,numbers:8,numbers:9] ~@666>`).gain(0).color(\'black\')',
	},
	{
		name: "Strudelwall",
		by: "eefano",
		code: '// "Strudelwall"\n// guitar prototype @by eefano\nconst standardtuning = [40,45,50,55,59,64];\n\nconst fingering = \n{C:"x:3:2:0:1:0",A:"x:0:2:2:2:0",G:"3:2:0:0:0:3",E:"0:2:2:1:0:0",D:"x:0:0:2:3:2"\n,Am:"0:0:2:2:1:0",Em:"0:2:2:0:0:0",Dm:"x:0:0:2:3:1",Em7:"0:2:2:0:3:3", G_:"3:2:0:0:3:3"\n,Dsus4:"x:x:0:2:3:3",A7sus4:"x:0:2:0:3:3"\n};\nconst sk = 300, sh = silence, strumming = \n{d: stack(0,timeCat([1,sh],[sk,1]),timeCat([2,sh],[sk,2]),timeCat([3,sh],[sk,3]),timeCat([4,sh],[sk,4]),timeCat([5,sh],[sk,5]))\n,u: stack(5,timeCat([1,sh],[sk,4]),timeCat([2,sh],[sk,3]),timeCat([3,sh],[sk,2]),timeCat([4,sh],[sk,1]),timeCat([5,sh],[sk,0]))\n//{d: "[~@0 0@300],[~@1 1@300],[~@2 2@300],[~@3 3@300],[~@4 4@300],[~@5 5@300]"\n//,u: "[~@5 0@300],[~@4 1@300],[~@3 2@300],[~@2 3@300],[~@1 4@300],[~@0 5@300]"\n};\n\nconst gString = register(\'gString\', (n, pat) => \n  (pat.fmap((v) => { if(v[n]==\'x\') return note(0).velocity(0);\n      return note(v[n]+standardtuning[n]); } \n  ).innerJoin()));\nconst guitar = (strums,fingers,tuning=standardtuning) =>\n  (strums.pickRestart(strumming).pickOut(\n    [fingers.pickOut(fingering).gString(0),fingers.pickOut(fingering).gString(1),fingers.pickOut(fingering).gString(2)\n    ,fingers.pickOut(fingering).gString(3),fingers.pickOut(fingering).gString(4),fingers.pickOut(fingering).gString(5)]));\n\nstack(\n  guitar("[d@4 d@3 u d u d@2 d@3 u d u d@2 d@2 d u@2 u@2 u d u d u]/4","[Em7@9 G_@8 Dsus4@6 A7sus4@7 G_@2]/4")\n    .s("gm_acoustic_guitar_steel:2").clip(1).release(0.4).gain(0.6)\n\n).cpm(174/4)//.pianoroll()',
	},
	{
		name: "Strumtest 1",
		by: "eefano",
		code: 'const k = 0.02;\n\nfunction tablature(te,tB,tG,tD,tA,tE)\n  { return stack(tE.add(64).late(k*5),\n                 tA.add(59).late(k*4),\n                 tD.add(55).late(k*3),\n                 tG.add(50).late(k*2),\n                 tB.add(45).late(k),\n                 te.add(40)); }\n\nconst guitar = seq(tablature("0","2","2","1","0","0"),\n                   tablature("0","3","2","0","1","0"),\n                   "~");\n\nstack(\n  guitar.note().s("gm_electric_guitar_jazz").clip(1).release(0.4).gain(0.5),\n\n).cpm(110/4/2).pianoroll()',
	},
	{
		name: "Strumtest 2",
		by: "eefano",
		code: 'setDefaultVoicings(\'legacy\')\nconst k = 0.01;\n\nstack(\n  n(stack("~ -1","~@0.5 0@1.5","1 1".late(k),"~ 2".late(k*2),"~ 3".late(k*3)))\n     .chord("G!2 Bm E ".slow(4)).anchor("G4!2 F#4 E4".slow(4)).voicing()\n     .s("gm_electric_guitar_jazz").clip(1).release(0.4).gain(0.5),\n\n).cpm(140/4).pianoroll()',
	},
	{
		name: "Strumtest 3",
		by: "eefano",
		code: 'setDefaultVoicings(\'legacy\')\n\nconst k = 0.01;\n\nstack(\n  n(stack("0@2 0 3@2 3 0 3",\n          "1@2 1 2@2 2 1 2".late(k),\n          "2@2 2 1@2 1 2 1".late(k*2),\n          "3@2 3 0@2 0 3 0".late(k*3)))\n     .chord("G!2 Bm E ".slow(4)).anchor("G4!2 F#4 A4".slow(4)).voicing()\n     .s("gm_electric_guitar_jazz").clip(1).release(0.2).gain(0.5),\n\n).cpm(140/4).pianoroll()',
	},
	{
		name: "Swimandsleep",
		by: "eefano",
		code: '// "Swim And Sleep Like A Shark" (Work In Progress)\r\n// song @by Unknown Mortal Orchestra\r\n// script @by eefano\r\nsetCps(123/60)\r\nPattern.prototype.enumerate = function () {\r\n  const pat = this.sortHapsByPart()\r\n  return new Pattern(state => {\r\n    const haps = pat.query(state.withSpan(span => span.begin.wholeCycle()))\r\n    const chunks = haps.length\r\n    return haps.map((hap, i) => new Hap(hap.whole, hap.part.intersection(state.span), [hap.value, i, chunks])\r\n                  ).filter(hap => hap.part != undefined)\r\n  }).splitQueries()\r\n}\r\nPattern.prototype.warp = function (tpat) {\r\n  const pat = this;\r\n  return tpat.enumerate().withValue(v => pat.zoom(Fraction(v[1]).div(v[2]), \r\n                                                  Fraction(v[1]).add(1).div(v[2])) ).outerJoin()}\r\nfunction tablature(te,tB,tG,tD,tA,tE)\r\n  { return stack(te.add(64),tB.add(59),tG.add(55),tD.add(50),tA.add(45),tE.add(40)); }\r\n\r\nconst parts = \r\n{theme: tablature(\r\n"~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~  ~ ~  ~ ~  ~  ~  ~ 11  ~",\r\n"9 ~ 9 ~ 10 9 7 ~ 9 6 ~ 10 ~ 10 ~ 12 14 14  ~ 13",\r\n"~ ~ ~ ~  ~ ~ ~ ~ ~ ~ 6  ~ ~  ~ ~  ~  ~  ~  ~  ~",\r\n"~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~  ~ ~  ~ ~  ~  ~  ~  ~  ~",\r\n"7 7 ~ 7  ~ 7 5 5 ~ 4 ~  9 9  ~ 9  ~  ~ 11  ~ 11",\r\n"~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~  ~ ~  ~ ~  ~  ~  ~  ~  ~",\r\n).warp("t@2 t!4 [t!2]@4 t!2 [t!3]@6 t!4 t@2 t@3 t t@4").slow(16)\r\n,arp1: tablature(\r\n"~ ~ ~ 0 ~ ~ ~ 0 ~ ~ ~ 0",\r\n"~ ~ ~ ~ ~ ~ ~ ~ ~ 0 ~ ~",\r\n"~ 6 ~ ~ ~ 4 ~ ~ ~ ~ 2 ~",\r\n"~ ~ 6 ~ ~ ~ 4 ~ ~ ~ ~ ~",\r\n"4 ~ ~ ~ 2 ~ ~ ~ 0 ~ ~ ~",\r\n"~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",).slow(6)\r\n,chords: tablature(\r\n"~ ~ ~",\r\n"0 2 0",\r\n"1 2 1",\r\n"2 2 2",\r\n"2 0 2",\r\n"0 ~ 0",).warp("t@3 t t@4").slow(8)\r\n,arp2: tablature(\r\n"~ ~ ~ 4 ~ ~ ~ ~ ~ 4 ~ ~ ~",\r\n"~ ~ 2 ~ 2 ~ ~ 4 ~ ~ 4 ~ ~",\r\n"~ 3 ~ ~ ~ 3 ~ ~ 4 ~ ~ 4 ~",\r\n"~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 4",\r\n"~ ~ ~ ~ ~ ~ 2 ~ ~ ~ ~ ~ ~",\r\n"2 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",).warp("t!3 t@2 t t@2 t!6 t@2").slow(8)\r\n,arp3: tablature(\r\n"~ ~ ~ 0 ~ ~ ~ ~ ~ ~ 0 ~ ~ ~ ~",\r\n"~ ~ ~ ~ ~ ~ ~ ~ 0 ~ ~ 0 ~ ~ ~",\r\n"~ 4 ~ ~ 4 ~ ~ ~ ~ 2 ~ ~ 2 ~ ~",\r\n"~ ~ 4 ~ ~ 4 ~ ~ ~ ~ ~ ~ ~ ~ ~",\r\n"2 ~ ~ ~ ~ ~ 2 0 ~ ~ ~ ~ ~ 0 2",\r\n"~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 0",).warp("t!3 t@2 t!11").slow(8)\r\n,lick1: tablature(\r\n" ~  ~  ~  ~ 17  ~",\r\n"17  ~ 17  ~  ~ 17",\r\n" ~  ~  ~  ~  ~  ~",\r\n" ~  ~  ~  ~  ~  ~",\r\n"16 16  ~ 16  ~  ~",\r\n" ~  ~  ~  ~  ~  ~",).warp("t@2 t!4 t@2").slow(4)\r\n,lick2: tablature(\r\n" ~  ~  ~  ~ 16  ~",\r\n"16  ~ 16  ~  ~ 16",\r\n" ~  ~  ~  ~  ~  ~",\r\n" ~  ~  ~  ~  ~  ~",\r\n"14 14  ~ 14  ~  ~",\r\n" ~  ~  ~  ~  ~  ~",).warp("t@2 t!4 t@2").slow(4)\r\n,coda: tablature(\r\n"~ ~ ~ ~  ~  ~  ~ ~",\r\n"7 5 7 9 10 10 12 9",\r\n"~ ~ ~ ~  ~  ~  ~ ~",\r\n"~ ~ ~ ~  ~  ~  ~ ~",\r\n"5 4 5 7  9  9 11 7",\r\n"~ ~ ~ ~  ~  ~  ~ ~",).warp("t@3 t!3 t@2 t@3 t t@4").slow(8)\r\n}; // end of parts\r\n\r\nconst split = register(\'split\', (deflt, callback, pat) => \r\n  callback(deflt.map((d,i)=>pat.withValue((v)=>Array.isArray(v)?(i<v.length?v[i]:d):(i==0?v:d)))));\r\n\r\nstack(\r\n  "<~@2 intro@16 verse@66 intro@16 verse@66 intro@16 solo@32 verse@66 intro@16 solo@32 ~@4>".pickRestart(\r\n  {intro: "<theme@16>", \r\n   verse: "<arp1@6 chords@8 arp2@8 arp1@6 chords@8 arp1@6 chords@8 arp3@8 chords@8>",\r\n   solo: "<lick1 lick2 lick2:-2 lick1:-5 lick1:-7 lick2:-7 coda@2>/4"}).split([0,0],(x)=>x[0].pickRestart(parts).transpose(x[1]))\r\n  .note().s("gm_electric_guitar_jazz:0").clip(1).release(0.4).gain(0.6).color(\'yellow\'),\r\n\r\n  "<~@2 ~@16 0@66 ~@16 0@66 ~@48 0@66 ~@48 ~@4>".pickRestart([\r\n    `<7@2 9 7 6@2 8@2 5@2 7@2 7@2 6 5 4@2 2@6 ~@2 \r\n    4@2 4b@5 4 5 6 4@5 4 6@2 7@4 6@4 5@3 4 2@6 ~@8\r\n    8@2 9@4 8@4 7@4 7@6 ~@7\r\n    5@3 [4@4 5 4]@8 [3 4 5 7 5 3]@8 2@6 ~@10>*2`]).scale("e:major").transpose(12)\r\n  .note().s("gm_ocarina").gain(0.6).color(\'green\'),\r\n  \r\n  "<0@2 1@16 1@66 1@16 1@66 1@48 1@66 1@48 ~@4>".pickRestart([\r\n    "<mt sd*4 sd lt>*2",\r\n    "<bd ~ bd*2 bd*2>,sd,hh*2"])\r\n  .s().bank("Linn9000").clip(1).gain(0.08).color(\'cyan\')  \r\n).room(0.3)',
	},
	{
		name: "Swimmingsnake",
		by: "eefano",
		code: '// "Swimming With The Snake" - Work In Progress\r\n// song @by Tim Smith of Cardiacs\r\n// script @by eefano\r\nsetCps(95/60)\r\nconst rando1 = `4 5 6 3 5 6 5 2 3 4 5 2 6 ~ 7 6 \r\n4 2 5 3 6 5 3 7 4 5 6 3 7 ~ 9 4 6 7 3 5 3 6 5 1 4 5 3 4 2 3 4 5\r\n7 8 9 7 8 9 10 6 3 7 6 4 5 6 7 8 9 3 5 6 7 8 3 5 6 7 5 6 7 9 8@2`\r\nconst rando2 = `0 1 2 -1 0 1 -2 2 1 5 4 -3 0 1 2 -2\r\n2 1 0 1 2 0 1 0 1 -1 0 -2 0 -1 -2 -1 -2 -3 -2 -1 0 -1 0 -2 -1 -2 1 0 ~ 0 -2 0\r\n1 3 0 1 -1 2 1 0 -1 -2 -1 0 1 -3 -1 0 1 -2@2 -1 0 1 -1 -2 1 3 4 5 -1 2 3 1`\r\nconst halo = x => \r\n  x.slow(20).scale("c#:minor").add(12).note()\r\nconst part = stack(rando1.apply(halo).gain(0.2), rando2.apply(halo).gain(0.1))\r\nconst pats =\r\n{ba1: "[0@8 -1@4 -2@2 -3@2 -2@8]/24"\r\n,ba2: "[-2 -1 0]/6"\r\n,ba4: "[-1 -2 -3 2 -2 -5 [-4 -3 -2 -1 0 2 -4 -3]@12 -2@8]/26"\r\n,al2: "[[5,2] ~ [5,2] [3,0] ~ [3,0] [4,1] ~ [4,1] [0,-3] ~ [0,-3]]/6"\r\n,vr1: "[~@0.5 11 13!2 11@4 ~ 11 13!2 11 9 10 11 <[ 9@2.5 8@2 7@3 ~] [~@0.5 9@3 ~@5]>@8.5 ]/24"\r\n,vr4: "[10 13 11 9 10 11 [9!2]@3 [7!2]@3 ~@14]/26"\r\n,tr1: "[0 3 1 4 2 5 -1 2 0 3 1 4 2 5 3 6 4 1 2 -1 3 0 4 1]/6"\r\n}\r\nstack(part.layer(x=>x.pan(0.2),x=>x.pan(0.8).late(3/4)).s("gm_pad_warm").release(0.05).room(0.5).color("white")\r\n      \r\n,"<ba1@48 ba2@24 ba1@24 ba1@22 ba4@26 ba1@24 ba1@22 ba4@26>"\r\n .pickRestart(pats).scale("c#:minor").sub(12).note().s("gm_synth_strings_2").gain(1).color("green")\r\n,"<~@48 al2@24 ~@24 ~@22 ~@26 ~@46 ~@26>".pickRestart(pats).scale("c#:minor").add(24).note()\r\n      .s("gm_recorder").superimpose(x=>x.late(1/2).velocity(.5)).release(0.2).gain(0.4).color("red")\r\n,stack("<~@48 ~@24 vr1@46 vr4@26 vr1@46 vr4@26>".pickRestart(pats),\r\n       "<~@48 ~@24 ~@46 ~@26 vr1@46 vr4@26>".pickRestart(pats).sub(2))\r\n .scale("c#:minor").transpose(0).note().s("triangle").hpf(900).attack(.05).release(.05).clip(.97).gain(1.2).color("yellow")\r\n,"<~@48 ~@24 ~@46 ~@26 ~@46 tr1@26>".pickRestart(pats).scale("c#4:minor")\r\n      .superimpose(x=>x.transpose(12)).note().s("supersaw").gain(0.20).lpf(2000).color("red")\r\n,s("shaker_small").struct("[x ~ ~ x]").gain("4.0 ~ ~ 2.0").color("brown")\r\n,s("handbells").struct("x*2 x").gain(rand.range(0.1,0.4)).color("brown")\r\n  \r\n)//.pianoroll()',
	},
	{
		name: "Tablaturetest",
		by: "eefano",
		code: '// NOT WORKING UNTIL mixJoin is implemented\n\nconst k = 2;\n\nconst tablature = (pat) => reify(pat)\n  .fmap(([te,tB,tG,tD,tA,tE]) => stack(\n      pure(tE+64).late(k*5).color("#FFF0F0"),\n      pure(tA+59).late(k*4).color("#FFE0E0"),\n      pure(tD+55).late(k*3).color("#FFD000"),\n      pure(tG+50).late(k*2).color("#FFD8D8"),\n      pure(tB+45).late(k*1).color("#FFD0D0"),\n      pure(te+40).late(k*0).color("#FFE8E8"))    \n  ).outerJoin()\n\nconst guitar = tablature("0:2:2:1:0:0!2 0:3:2:0:1:0 ~");\n\nstack(\n  "E3 C3 ~".s("triangle"),\n  guitar.note().s("gm_electric_guitar_jazz").clip(1).release(0.4).gain(0.5),\n\n).slow(5).pianoroll()',
	},
	{
		name: "Tarantella",
		by: "eefano",
		code: '// "Endless Tarantella"\n// script @by eefano\nsetcps(140/60)\n\n//let pizza = run(16).slow(16) \nlet pizza = rand.range(0,16).segment(16).slow(16)\n\niamme: pizza.pick(["4 ~ 4","7 ~ 7","4","4 ~ 4","5 ~ 5","5 6 5","4","4 ~ 5","4@2 3","3 ~ 4","3@2 2","2 ~ 3","4 5 4","3 2 1","0","7 ~ 7"])\n  .scale("a:minor").s(\'gm_clarinet\').note()\n\nlet pasta = pizza.pick([0,0,0,0,1,1,0,0,2,2,0,0,2,2,0,0]).fast(2)\n\nfuniculi: pasta.pick(["[0 ~] [-3 ~]","[3 ~] [-2 ~]","[1 ~] [-3 ~]"]).slow(2)\n  .scale("a2:minor").s(\'gm_tuba\').note().lpf(800)\n\nfunicula: pasta.pick(["[~@2 [0,2,4]]!2","[~@2 [1,3,5]]!2","[~@2 [4,-1,1]]!2"]).slow(2)\n  .scale("a3:minor").s(\'gm_harmonica\').note()\n\nuagliu: s("tambourine")',
	},
	{
		name: "Ventocaldo",
		by: "eefano",
		code: '// "Il Vento Caldo Dell\'Estate (wip)"\n// song @by Alice\n// script @by eefano\nconst split = register(\'split\', (deflt, callback, pat) => callback(deflt.map((d,i)=> pat.withValue((v)=>{\n  const isobj = v.value !== undefined; const value = isobj ? v.value : v;\n  const result = Array.isArray(value)?(i<value.length?value[i]:d):(i==0?value:d);\n  return (i==0 && isobj) ? {...v,value:result} : result; }))));\nsetCps(115/60)\n\nsynt: "<a@27 b@70 b@75 ~@56 b@70 b@75 ~@56 ~@87 ~@8>".pickRestart({\n  a: "<0@6 0@6 0@7 0@7 0@8 0@10 0@10>*2",\n  b: "<0@6 0@6 0@6 0@7 0@7 0@6 0@6 0@6 0@6 0@7 0@7 0@6 0@8 0@10 0@8 0@10 0@8 0@10 0@10 0@10>*2"\n    \n}).pickRestart(["<0 4 7 8 10 11 9 12 14 12>*2"])\n  .scale("c#4:major").note().s("gm_drawbar_organ:4").room(.3).lpf(1200).gain(0.7).color(\'yellow\')\n\nbass: "<a@172 b@56 a@145 b@56 c@87 ~@8>".pickRestart({\n  a: "<[<c#2:1!22 [c#2:.8 c#2:.9] > <c#3:1!6 [c#3:.8 c#3:.9]>]>".s("gm_electric_bass_finger:2"),\n  b: "<~@2 c#2:1@4 c2:1@2 a#1:1@6 c2:1@2 g#1:1@8 d#2:1@8 c2:1@8 f2:1@8 c#2:1@8>".s("triangle"),\n  c: "<~@2 [[c#2!6 a#1!8 g#1!6 d#2!8 c2!8 f2!8 c#2!8]!2]@104>".fast(1.2).s("gm_electric_bass_finger:2"),\n}).split([0,.6],s=>note(s[0]).clip(s[1])).lpf(400).gain(1.5).color(\'cyan\')\n\nwind: "<~@172 a@56 ~@145 a@56 b@87 ~@8>".pickRestart({\n  a: "<~@2 C#:g#2@4 G#:g#2@2 A#m:g#2@6 C#:g#2@2 G#:g#2@8 D#:d#2@8 Cm:d#2@8 F7:d#2@8 C#:d#2@8>",\n  b: "<~@2 [[C#:g#2:1@6 A#m:g#2:1@8 G#:g#2:1@6 D#:a#2:1@8 Cm:a#2:1@8 F7:a#2:1@8 C#:a#2:1@8]!2]@104>".fast(1.2)\n     \n}).split([0,0,0],s=>\n   n(s[2].pickRestart(["<0,1,2,3>/8","<[0,1,2,3]*3>/2"]))\n  .chord(s[0]).anchor(s[1]).mode(\'above\').voicing().s("gm_church_organ").gain(0.7)\n  .superimpose(u=>u.when(s[2],w=>\n   n("<4 5 6 7 8 7 6 5 4>*8").chord(s[0]).anchor(s[1])).mode(\'above\').voicing().s("sawtooth").gain(0.65))\n  ).room(.7).color(\'green\')\n\nvoic: "<~@172 a@56 ~@145 a@56 b@87 ~@8>".pickRestart({\n    a: note(`<~ c#4 d#4@2 c#4@2 [c4 c#4] [d#4 f4] c#4@2 d#4@2 ~ [~ c#4] [c4 c#4] [d#4 f4] d#4 g#3@5\n         ~ [~ d#4] f4@2 d#4@2 d4 d#4 ~ [~ d#4] f4@2 [g4 f4] [d#4 f4] d#4@2\n         ~ [~ d#4] f4@2 d#4@2 [f4@3 d#4@3]@3 f4@9 >`)\n      .s("gm_oboe").gain(1.7).lpf(3000).release(.1),\n    b: note(`<~@2 [[d#4@2 c#4@2 [c4 c#4] [d#4 f4] c#4@2 [d#4@6 ~ c#4]@4 [c4 c#4] [d#4 f4] d#4 \n         [g#3@8 ~ d#4]@5 f4@2 d#4@2 d4 [d#4@4 ~ d#4]@3 f4@2 g4@2 d#4@3\n         [~ d#4] f4@2 d#4@2 f4@2 d#4 f4@8 [~ <c#4 ~>]]!2]@104 >`).fast(1.2)\n      .s("gm_distortion_guitar:2").gain(1).lpf(3000).release(.1)\n}).color(\'purple\').room(.2)\n                              \ndrums: `<a@27 [a,b]@24 [a,b,c]@5 [a,d]@56 [a,d,e]@2 [a,d]@20 [a,d,f]@2 [a,d]@24 [a,d,g]@2 [a,d]@10 \n        ~@56 [a,d]@145 ~@56 h@87 ~@8>`.pickRestart({\n  a: "<bd,hh>", b: "<~ ~ sd ~>", c:"<[~ sd*2] ~@4>", d:"<~ sd>", e:"<~ [~ sd*2]>", \n  f:"<~ [[~ sd] [sd ~]]>", g:"<~ [~ sd]>", \n  h:"<[[[sd,[~ sd@15]] sd] sd]@2 [[bd sd [~ bd] sd]!24]@96 bd@8>".fast(1.2)\n}).pickOut({\n  bd: s(\'bd\').lpf(800).velocity(1.1),\n  sd: s(\'sd\').velocity(.7),\n  hh: s(\'hh\').velocity(0.1).hpf(8000),\n  cr: s(\'cr\').speed(0.7).velocity(0.1).hpf(6000),\n}).bank("Linn9000").room(0.2).gain(0.8).rsize(4)',
	},
	{
		name: "Verminmangle",
		by: "eefano",
		code: '// "Vermin Mangle" (work in progress)\n// song @by Tim Smith (Cardiacs)\n// script @by eefano\nsetcps(52 / 60)\nconst song = `< i@8 j@27 >`\nconst melody = {\n  i: "<f#4 ~ c#5@3 ~ a#4@2 g#4 ~ f#4 ~ a4@2 g#4 ~ f#4 ~ e4 ~ d4@2 ~@2 >*6",\n  j: `<f#5@2 [e5@2 c#5] c#5 [f#4 a#4 c#5] [f#5@2 g#5] g#5 a5 [c#5@2 f#5 f#5@2 f#5] f#5 e5\n       [c#5 b4 a#4 f#4] f#4 g#4 [c#4@3 a#4 e5@2] [d5 c#5 b4] [b4 a4 g4] f#4!2 g#4 [c#4@2 f#4] f#4@2 ~@100>`,\n}\nconst ch0rds = {\n  i: "<F#@2 E7@2>",\n  j: "<F#@2 E7@2 F#@2 E D F# D E F# B E F# E G D B E F# D E F#@2 E@2>",\n}\n\n$: note(song.pickRestart(melody)).clip(.98)\n  .apply(song.pickRestart(\n    { i: x=>x.s("gm_trumpet").pan(.3).gain(.6),\n      j: x=>x.s("gm_vibraphone:4").vib(10).vibmod(.09).delay(.4).dt(.2).dfb(.10).gain(.7).dec(2)\n    }))\n     \n$: chord(song.pickRestart(ch0rds)).anchor(\'E4\').voicing()\n  .layer(x=>x.s("gm_accordion:2").struct("[~ x x]").clip(.6).pan(.40).gain(.4),\n         x=>x.transpose(12).s("gm_string_ensemble_2:2").pan(.5).gain(.4))\n\n$: n("[0 ~ ~]").chord(song.pickRestart(ch0rds)).mode(\'root\').anchor(\'f#2\').voicing()\n  .s("gm_tuba:3").gain(1)\n\n$: s("bassdrum2:2,tambourine:0").clip(1.5).gain(1.5)\n\nall(x => x.room(.8))',
	},
	{
		name: "Veronicainecstasy",
		by: "eefano",
		code: '// "Veronica In Ecstasy" (Chorus)\n// song @by Tim Smith (of Cardiacs)\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\nconst chrds = "<B [F# A] [C G] [D C#] [E A] [B C#] [Fm A#] [E A] [A# Fm] [E F#] [E F#]>";\nconst meldy = `[[f#6]*3 [f#6 [~ ~ f#6]]]  [[f#6]*3 [[f#6 e6 ~] e6]]\n               [[e6 e6 [e6 f#6]] [[g6 ~ d6] d6]]  [[d6 d6 [e6 f#6]] [g#6 f6 c#6]]\n               [[g#5 [ ~ ~ g#5]]  [[a5 b5] c#6 c#6]]  [[f#6]*3 [f6 c#6 g#5]]\n               [[g#5 [ ~ ~ g#5]] [[a#5 c6] d6 a#5]]  [[g#5 a5 b5] [c#6 d6 e6]]\n               [[d6 a#5 f5] [[g#5 ~] g#5]] ~ [~@3 [~ ~ f#6]]`.slow(11);\nstack(\n  meldy.clip(0.9).note(),\n  //meldy.transpose("-12").note(),\n  chord(chrds).anchor("G4").voicing().struct("<[[~ x x] [x@2 x] [~ x ~] x]!8 [x!4] [~ x ~ x]!2>").gain(0.6),\n  chrds.rootNotes(2).note().struct("<[x@2 ~]*2!9 [x ~ [~ ~ x] ~]!2>").gain(0.6),\n).cpm(120/4).room(0.4).piano()//.pianoroll()\n .room(    slider(1.93,0,10))\n  .rsize(   slider(2,0,8,1))',
	},
	{
		name: "Veronicazigzag",
		by: "eefano",
		code: 'setDefaultVoicings(\'legacy\')\nconst chrds = "<B [F# A] [C G] [D C#] [E A] [B C#] [Fm A#] [E A] [A# Fm] [E F#] [E F#]>".rev();\nconst meldy = `[[f#6]*3 [f#6 [~ ~ f#6]]]  [[f#6]*3 [[f#6 e6 ~] e6]]\n               [[e6 e6 [e6 f#6]] [[g6 ~ d6] d6]]  [[d6 d6 [e6 f#6]] [g#6 f6 c#6]]\n               [[g#5 [ ~ ~ g#5]]  [[a5 b5] c#6 c#6]]  [[f#6]*3 [f6 c#6 g#5]]\n               [[g#5 [ ~ ~ g#5]] [[a#5 c6] d6 a#5]]  [[g#5 a5 b5] [c#6 d6 e6]]\n               [[d6 a#5 f5] [[g#5 ~] g#5]] ~ [~@3 [~ ~ f#6]]`.slow(11).rev();\nstack(\n  meldy.clip(0.9).note(),\n  chord(chrds).anchor("G4").voicing().struct("<[[~ x x] [x@2 x] [~ x ~] x]!8 [x!4] [~ x ~ x]!2>").gain(0.55),\n  n("0").chord(chrds).mode("root:c3").voicing().struct("<[x@2 ~]*2!9 [x ~ [~ ~ x] ~]!2>").gain(0.7),\n).cpm(105/4).piano()\n.room(    slider(1.93,0,10))\n.rsize(   slider(2,0,8,1))',
	},
	{
		name: "Vine",
		by: "eefano",
		code: '// "Vine" (work in progress)\n// composed @by Tim Smith of Spratleys Japs\n// script @by eefano\nsetCps(143 / 60 / 4)\nconst song = "<0@8 1@28 2@24 3@24 1@25 1@28 2@36 3@24 4@16 5@12 6@66 7@66 8@66 ~@8>*4"\nconst chordseq = song.pickRestart(["~",\n"<C@3 G# C# Cm G# C# Cm B F# A@3>*2", // verse\n"<E B C# G# A# F>*2", // chorus\n"<G# C@2>/2", "~", // post-chorus\n"<E@4 C@2 A#@3 D@4 C@2 G#@5 D@4>*8", // interlude\n"<Dm@9 G@5 A@5 G@4 A@6 Dm@4 G@10 A@5 G@3 A@4 G@5 Dm@13 G@7 A@5 G@7 A@4 G@4 Dm@7 G@9 A@4 G@5 A@3 G@4>*8", //snare      \n"<Dm@9 G@5 A@5 G@4 A@6 Dm@4 G@9 A@6 G@3 A@4 G@5 Dm@13 G@7 A@5 G@7 A@4 G@4 Dm@7 G@9 A@4 G@5 A@3 G@4>*8", //handclaps\n"<Dm@9 G@6 A@5 G@4 A@6 Dm@4 G@9 A@6 G@3 A@4 G@5 Dm@13 G@7 A@5 G@7 A@4 G@4 Dm@7 G@9 A@4 G@5 A@3 G@3>*8"]); //triangle\n\nvoice: song.pickRestart(["~",\n  note("<c4*2 c4 [a#3 c4] c4@2 ~ c4*2 d#4 f4 ~ d#4*2!2 d#4 c4 g#4 ~ g4 ~ [f#4 f4] [d#4 c#4] a#3 ~ [e4 d#4] e4 [e4 f#4] g#4@2 g#4>*4"),\n  note("<[g#4@2 ~ f#4] [f#4@2 ~ f4] [f4@2 ~ d#4] [d#4@2 ~ d4] [d4@2 ~ c4] [c4 a4@3]>*2").gain(1.4),\n  "~"\n]).s(\'gm_oboe\').clip(.95).color(\'yellow\')\n\nbass: n(song.pickRestart(["~","0*4","[0@2 ~ 0]*2","0*8"])).chord(chordseq).mode("root:e2").voicing()\n  .s("gm_electric_bass_pick").clip(.90).lpf(300).gain(1).color(\'green\')\nguitar: n(song.pickRestart(["~","[0,2,3]*2","[[0,2,3]@3 [0,2,3]]*2","~"])).chord(chordseq).mode("root:e3").voicing()\n  .s(song.pick(["~","gm_acoustic_guitar_steel:2","gm_overdriven_guitar:2","~"])).color(\'red\')\norgan: n(song.pick(["~","~","~","~","[2 1]*4"])).anchor("g5").chord(chordseq).voicing()\n  .s("sawtooth").clip(.6).color(\'cyan\')\n\ndrums: song.pickRestart([\n  "<hh*4,[<bd bd*2> sd]>*2",\n  "<hh*4,[bd sd]>*2",\n  "<hh*4,[bd sd]>*2",\n  "~","<sl*4>","<sl*4>",\n  "<hh*4,[<bd bd*2> sd]>*2",\n  "<hh*4,[<bd bd*2> [sd,cp]]>*2",\n  "<hh*4,tr*2,[<bd bd*2> [sd,cp]]>*2",\n]).pickOut({\n  bd:s(\'linndrum_bd\').lpf(3000).room(.2).velocity(.8),\n  sd:s(\'linndrum_sd\').room(.2).velocity(.65),\n  hh:s(\'linndrum_hh\').hpf(7000).speed(1.5).velocity(.3),\n  oh:s(\'linndrum_oh\'),\n  sl:s(\'sleighbells\'),\n  tr:s(\'anvil\').speed(1.15).velocity(30),\n  cp:s(\'cp\')\n})\n\nall(x=>x.room(.1)\n   // .ribbon(2*4,1*8)\n  )',
	},
	{
		name: "Waltzno 2",
		by: "eefano",
		code: '// "Waltz #2" (cps function demo)\n// composed @by Dmitri Shostakovich\n// script @by eefano\nsetDefaultVoicings(\'legacy\')\n\nmelody: "<~@4 0@16 1@7 2@11.5 ~@3.5>".pickRestart([\n  `<4 [2@2 1] [0@4 0 1]@2 [2 0 2] [4@2 5] 4 3 \n    3 [1@2 0] [0b@4 -3 0b]@2 [1 0b 1] [3 4 5] 4b 4>`,\n    "<[9,7] [[8,6]@2 [7,5]] [[6,4]@2 [5,3]] [3,0] [8,6] [[7,5]@2 [6,4]] [6,4]>", \n  "<[~ [2 ~] [3 ~]] [[4 ~] [4 3] [4 5]] [[3 ~] [3 2] [3 4]] [[2 ~] ~ [4 ~]] > ".sub("<0 0 [0,2]>/4") ])\n      .scale("c4:minor").note().s("gm_oboe:2").gain(0.7)._pianoroll({minMidi:10})\n   \npiano: "<0@28 1@10 0@4>".pickRestart([\n     n("<<0 -1> [4,5]!2>*3").chord("<Cm@10 Fm@4 G@4 Cm@4 Fm@2 Bb@2 Eb Ab>"),\n     n("<3 <[4,5] > ~>*3").chord("<G Ab Cm Ab>")\n          ]).anchor(\'f2\').mode(\'root\').voicing().piano()._pianoroll()\n\ntempochanges: cps(sine.segment(32).slow(16).mul(30).add(160).div(60*3)).gain(0)\n\nall(x=>x\n  //.ribbon(24,16)\n  .room(0.6))',
	},
	{
		name: "Woodeneye",
		by: "eefano",
		code: '// "Woodeneye" (wip)\n// song @by Cardiacs\n// script @by eefano\nsetCps(200 / 60 / 2)\nconst song = "<1@16 2@16 3@7 4@4>"\nconst chordseq = song.pickRestart([\n    "~",\n    "<[~ A:f4:.6:0!15]>/4",\n    "<[~ A:g4:.6!7] [F:f4:.6!8]>/2",\n    "<D:d4 G:d4 A:d4:.8@2 B:g4 C:g4 G:d4:.8>",\n    "<[~ D:g4:.6!3] [D:g4 A:d4]>"])\n\nmello: chordseq.as("chord:anchor:clip:n").voicing().speed(0.97).begin(.03).s(\'gm_synth_bass_1\').lpf(2000).gain(.7).color(\'cyan\')\n\ndrums: song.pickRestart([\n    "<oh,<~ bd!3> [sd <~!3 [sd,oh]>]>*2",\n    "<hh,<~ bd!3> [sd <~!3 bd ~!3 [sd,oh]>]>*2",\n    "<hh,<~ bd!3> [sd <~!3 [sd,oh]>]>*2",\n    "<oh,[bd <~!3 bd>] sd>*2",\n]).pickOut({\n    bd: s(\'linndrum_bd\').lpf(2000).room(.2).velocity(.8),\n    sd: s(\'linndrum_sd\').room(.2).velocity(.75),\n    hh: s(\'linndrum_hh\').hpf(7000).speed(1.5).velocity(.4),\n    oh: s(\'linndrum_oh\').speed(1.3).hpf(3000).velocity(.3).clip(1.2),\n})\n\nall(x => x.room(.1)\n    // .ribbon(2*4,1*8)\n)',
	},
];
