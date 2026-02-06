import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../components/NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'General/NavBar',
    component: NavBar,
    decorators: [(Story) => <div style={{ padding: '2rem' }}><Story/></div>],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
    args: {
        logoUrl: '../assets/tutorial.svg',
        title: 'Home page',
        children: [
            <button key="1" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</button>,
        ],
    },
}; 

export const WithMultipleButtons: Story = {
    args: {
        logoUrl: '../assets/tutorial.svg',
        title: 'Dashboard',
        children: [
            <button key="1" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</button>,
            <button key="2" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Settings</button>,
            <button key="3" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Profile</button>,
        ],
    },
};

export const WithLongTitle: Story = {
    args: {
        logoUrl: '../assets/tutorial.svg',
        title: 'This is a very long title to test the layout of the NavBar component',
        children: [
            <button key="1" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</button>,
        ],
    },
};