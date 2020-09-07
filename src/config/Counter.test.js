import Counter from './Counter';
import { render } from '@testing-library/react';
import React from 'react';


describe('Counter', () => {
    describe('increment()', () => {
        test('should be increment', () => {
            const props = {
                count:1
            }
            const counter = new Counter(props)
            counter.increment()
            console.log(counter.state.count)
            expect(counter.state.count).toBe(1)
        })
    })
    describe('render()', () =>{
        const { getByText } = render(<Counter />);
        const linkElement = getByText('test99');
        expect(linkElement).toBeInTheDocument();
    })
})