// @ts-check

import { Children } from 'react';

import isEmpty from './isEmpty';


/** This is probably a dumb component but it feels a bit cleaner and was a good way to get a better understanding of FC children types */

// function EXFunction() {
//     const somethingTrue = 'stefan is a jerk';

//     return <Flippy flipper={somethingTrue}>Wow, this is true :|: Impossible</Flippy>;
// }

// function EXFunction2() {
//     const somethingTrue = 'stefan is a jerk 2, carribean boogaloo';

//     return (
//         <Flippy flipper={somethingTrue}>
//             <TrumanComponent />
//             <FalsifiedComponent />
//         </Flippy>
//     );
// }

export default function Flippy({ children, flipper }) {
    let active = null;
    let inactive = null;

    let bool = false;

    // if flipper is undefined or null set bool to false
    if (flipper === undefined || flipper === null) {
        bool = false;
    }

    // if flipper is array or object, check if isEmpty or length is 0
    if (Array.isArray(flipper) || typeof flipper === 'object') {
        if (isEmpty(flipper)) {
            bool = false;
        }
    }

    if (typeof flipper === 'boolean') {
        bool = flipper;
    }

    // const arrayChildren = Children.toArray(props.children);
    if (Children.count(children) === 1) {
        const child = children;
        if (typeof child === 'string') {
            if (child.includes(':|:')) {
                const childArr = child.split(':|:');
                active = childArr[0];
                inactive = childArr[1];

                console.log(active, inactive);
            }
        } else {
            active = child;
        }
    } else {
        Children.map(children, child => {
            if (!active) {
                active = child;
            }
            if (active && Children.count(children) > 1) {
                inactive = child;
            }
        });
    }

    if (bool) {
        return active;
    } else {
        return inactive;
    }
}
