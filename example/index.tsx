import React from 'react';
import ReactDom from 'react-dom';

import { IWithVariantProps } from '../src/types';
import { WithVariants } from '../src';

import UserProfile from './UserProfile';
import UserProfile1 from './variants/1';
import UserProfile2 from './variants/2';

UserProfile.variants = {
  1: UserProfile1,
  2: UserProfile2
}

const UserProfileWithVariants: React.ComponentType<IWithVariantProps> = WithVariants(UserProfile);

const getSeconds = () => new Date().getSeconds();

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: getSeconds()
    };

    this.startTimer();
  }

  startTimer(): void {
    setInterval(() => {
      this.setState({
        time: getSeconds()
      });
    }, 1000);
  }

  render() {
    const { time } = this.state;

    return <div>
        <UserProfileWithVariants variant={0} time={time}/>
        <UserProfileWithVariants variant={1} time={time}/>
        <UserProfileWithVariants variant={2} time={time}/>
        <UserProfileWithVariants variant={3} render={({ displayName, variant }: { displayName: string, variant: number }) => {
            return <div style={{backgroundColor: 'pink'}}>This is a render prop variant. DisplayName: {displayName} Variant: {variant} Time: {time}</div>;
        }} />
      </div>;
  }
}

ReactDom.render(<App/>, document.getElementById('root'));
