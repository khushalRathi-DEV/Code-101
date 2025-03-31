type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEventType = Exclude<EventType, 'scroll'>;

const handleEvent = (event : ExcludeEventType) => {
  console.log(`Handling event : ${event}`);
};

handleEvent('click');
handleEvent('mousemove');
//handleEvent('scroll'); //this will throw an error