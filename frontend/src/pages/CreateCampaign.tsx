import * as React from 'react';

import { CreateForm } from '../components/CreateForm';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export interface CreateCampaignProps {

}

export interface CreateCampaignState {

}

export class CreateCampaign extends React.Component<CreateCampaignProps, CreateCampaignState> {

    constructor(props: CreateCampaignProps) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    render() {
        return (
            <MainLayout activePage={Pages.creating}>
                <h1>Create Campaign</h1>
                <CreateForm onSubmit={this.handleSubmit} onChange={() => {}} />
            </MainLayout>
        );
    }
}