# react-vary :cat: :smile_cat: :kissing_cat: :heart_eyes_cat: :joy_cat:

## Statically and Dynamically declare variants for AB testing react components

Similar to the Top-level API of prop-types, its as easy as:

```js
import { WithVariants } from 'react-vary';
import UserProfile1 from './variants/1';
import UserProfile2 from './variants/2';

// The Component that receives the variants will be considered default (variant 0)
class UserProfile extends React.Component {
  render() {
    return <div>DisplayName: {this.props.displayName} Variant: {this.props.variant}</div>
  }
}
UserProfile.variants = {
  1: UserProfile1,
  2: UserProfile2
}

const UserProfileWithVariants = WithVariants(UserProfile);

// However you determine variants is up to you
// Just pass the known variant number down through the parent HOC to render the AB Child
class App extends React.Component {
  render() {
    return (
      <div>
        {/* Variant 0 is our default UserProfile Component defined above */}
        <UserProfileWithVariants variant={0} />
        <UserProfileWithVariants variant={1} />
        <UserProfileWithVariants variant={2} />

        {/* It also supports render props for making variants on the fly! */}
        <UserProfileWithVariants variant={3} render={({ displayName, variant }) => {
            return <div>DisplayName: {displayName} Variant: {variant}</div>;
        }} />
      </div>
    );
  }
}

```
Pass a component to `WithVariants` and get an HOC wrapper back that passes data about your variants via props. Each variant receives the following props + whatever you pass to it.

```js
/**
 * @param {...Object} props - User defined Props will be flattened out and passed through
 * @param {Number} variant - The assigned variant number
 * @param {Object} variants - Reference to all known variants
 * @param {Boolean} isDefault - True if the variant is variant 0
 * @param {Number} variantCount - Total Count of all running variants
 */
```

More [Examples](https://github.com/cmswalker/react-vary/tree/master/example)
