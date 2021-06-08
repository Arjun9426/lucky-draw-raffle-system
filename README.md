# lucky-draw-raffle-system

This is a lucky draw raffle ticket service. It consist of a event entity and user entity.
event entity is nothing but a lucky draw event and users are normal users who can participate in an event.
each event has some attributes like id, startTime, endTime, prize, winner, fee.

# Features

An event can be created
A user can join an ongoing event
Winner of event can be calculated
Next Events can be seen
Last week event's winner can be seen

# APIs

createEvent : creates an event

joinEvent: a user joins an event

getNextEvent : get next event i.e first event whose start_time > currentTime

getWinner: get winner of an event

getLastWeekWinners: get last weeek event's winners
