# MA1805-group-project--solo-
This project is a continuation of my previous SoundCloud-inspired interactive site, 
where users scratched gray boxes to reveal album covers and play music. That project 
worked but was visually rough and had a lot of problems I never got around to fixing 
- songs would overlap if you scratched multiple boxes at once, the canvas didn't fill 
the screen properly, and there was no way to stop the music once it started. This time 
I wanted to fix all of that and push the concept further.

I've been using SoundCloud since I got my first phone. I have over 7000 liked tracks 
and finding hidden gems on there has genuinely been one of my hobbies for years. The 
algorithm on most platforms pushes the same popular songs constantly - SoundCloud always 
felt different because you could actually stumble onto something nobody else had heard. 
I wanted to capture that feeling of discovery in an interactive way and make it fun for 
other people to experience too. The idea is that finding new music shouldn't feel like 
a chore - it should feel like uncovering something.

The project is split into two pages - WAR and PEACE - because the music I listen to 
changes completely depending on my mood. Sometimes I want something dark and heavy, 
sometimes something calm and ethereal. I wanted the visual design to reflect that 
contrast rather than just being a neutral music player. WAR is red, black and grimey 
with blood drip effects. PEACE is soft blue and gold with light rays drifting down. 
You switch between them with a button in the bottom corner.

The goal is that someone could sit down with this, click through the boxes without 
knowing what any of them are, and walk away having found something they never would 
have searched for themselves.

## Technical Approach

Built entirely with p5.js for the canvas and interaction, and p5.sound for audio 
playback. No other frameworks or libraries were used.

The main challenge from my last project was getting only one song to play at a time. 
I solved this by storing a reference to whatever is currently playing in a variable 
called currentPlaying and stopping it before starting a new one. This sounds simple 
but I couldn't figure it out last time at all.

The two pages share the same 3x3 grid layout but use completely separate classes - 
WallBox for the WAR page and PeaceBox for the PEACE page. Each has its own visual 
style, colour scheme and hover behaviour. Switching pages stops the music, clears 
the boxes array and rebuilds it with the correct class for that page.

The WAR page has blood drip effects running behind the boxes using a BloodDrip class 
where each drip has a random speed, length and thickness and resets at the top when 
it falls off the bottom of the screen. The PEACE page has soft golden light rays 
using a similar LightRay class but drifting slower and much more transparent.

I ran into a few problems along the way. When I first set up GitHub and tried to push 
my code I got an error saying "src refspec main does not match any" which I fixed by 
searching the error on Google and finding the solution on Stack Overflow - you have to 
run git branch -M main before pushing. I also had an issue early on where none of my 
images were loading and spent a long time trying to fix the code before realising I 
had typed "image" instead of "images" as my folder name. Another issue was the cursor 
CSS change not working in Chrome on the canvas element - I tried moving it from the 
canvas selector to the body selector but Chrome still ignores it on canvas, so I left 
a comment in the CSS explaining this.

## Sources of Inspiration

My main inspiration was my own SoundCloud page and the experience of finding music 
nobody else is talking about. The contrast between WAR and PEACE as two emotional 
states was inspired by how differently I use music depending on how I'm feeling.

For the technical side I used the following videos to help build the scratch effect 
from my previous project and understand p5.js canvas interaction:

- Coding Train - p5.js introduction: https://www.youtube.com/watch?v=HerCR8bw_GE
- Scratch effect tutorial: https://youtu.be/nWhBxaPiiAI
- p5.sound tutorial: https://www.youtube.com/watch?v=Pn1g1wjxl_0&t=43s
- p5.js classes and objects: https://www.youtube.com/watch?v=T-HGdc8L-7w
- Blood drip / particle effect inspiration: https://www.youtube.com/watch?v=6CKW7tLv5e0

The retro terminal aesthetic was inspired by early internet design and CRT monitor 
visuals - I wanted the WAR page to feel like a corrupted old computer screen and the 
PEACE page to feel like the opposite, clean and almost celestial.

## Reflection

This project improved on almost everything I was unhappy with in my last one. The 
biggest win was finally getting the single-play logic working properly - in my previous 
project songs would overlap horribly if you scratched two boxes at the same time and I 
couldn't figure out how to fix it. This time I understood the problem better and solved 
it cleanly.

The two page concept came late in the process and I wasn't sure if it would work but 
it ended up being the most interesting part of the project. Having WAR and PEACE as 
two completely different visual and sonic experiences made the whole thing feel more 
intentional and less like just a demo. I took this inspiration from my MA1800 

If I had more time I would have added proper song and artist names to the labels 
instead of just TRACK 01, and I would have liked to fix the window resize issue where 
the boxes don't reposition correctly if you change the browser size.

Overall I'm happy with how it turned out. It feels like something I would actually 
want to use, which is what I was going for.

## Group Members
me, myself and Michal :D