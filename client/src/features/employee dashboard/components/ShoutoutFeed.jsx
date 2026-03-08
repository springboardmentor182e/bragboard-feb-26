import ShoutoutCard from './ShoutoutCard';
import { shoutouts } from '../../../data/mockData';

export default function ShoutoutFeed() {
  return (
    <div className="flex flex-col gap-4">
      {shoutouts.map((shoutout) => (
        <ShoutoutCard key={shoutout.id} shoutout={shoutout} />
      ))}
    </div>
  );
}
