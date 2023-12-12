# Multiplayer game

So the idea is that:

When the fe request for a game, (one person click on a join game btn)

The endpoint in the be will have to create a connection using socket.io (to a 3rd party be)
This connection also can pass info (player pos)
The be will also emit signal, using socket, where the fe will listen to

When the fe gets the signal from the be, it will use canvas to draw
Loop over each player, and craete them if not exist yet

ref: https://www.youtube.com/watch?v=_NPVEO--oVE

Game ideas:
- space shooter with friends, shoot incoming rocks
- the same as above but you fight each other

# Chatroom

Use websocket again but just use it to update everyone else of new messages that someone has posted

So whenever new data is added to my db the other users in that room should be notified using socket

# Notes

local storage is stored in browser, you need to tell it to remove it.
So maybe when you go in check if it exists? if it exists then remove and make a new one

use state will re-render whenever the setter is called
stored in browser mem
so if you refresh, the mem is reset

useEffect is basically a callback

custom hooks lets you save useEffects in a folder where you can use it anywhere you want
Maybe you have an onready useEffect that shoots fireworks and you want this to happen on all page
So instead of copy pasting the useEffect
Just grab it from your custom hooks

custom hooks are js files

you can collect all of the api calls inside this custom hook
beacause whenever you make calls / req, you need a setter right?

--

reducer

redux

using dispatch

redux tool kit!

create slice

a func with slice

set initial state and reducer