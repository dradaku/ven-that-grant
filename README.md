
# VenThatGrant - AI-Powered Grant Management Platform

## Overview

VenThatGrant is a comprehensive grant management platform that leverages artificial intelligence to help researchers, nonprofit organizations, and grant seekers find, apply for, and manage funding opportunities. Built on top of the Venice AI API, this application streamlines the entire grant lifecycle from discovery to reporting.

## Key Features

### Grant Discovery
- **AI-Powered Grant Matching**: Utilizes the Venice AI API to match user profiles with relevant grant opportunities from thousands of funding sources.
- **Advanced Filtering**: Search and filter grants by category, amount, deadline, and more.
- **Grant Saving**: Save interesting grants for later review and application.

### Proposal Creation & Optimization
- **AI-Generated Proposals**: Generate compelling research proposals tailored to specific grant requirements.
- **Proposal Management**: Create, edit, and track all your grant proposals in one place.
- **AI Critique & Optimization**: Get expert AI critique of your proposals with analysis of strengths, weaknesses, and suggestions for improvement.
- **Status Tracking**: Monitor proposal status (draft, optimized, submitted) throughout the application process.

### Reporting & Compliance
- **Automated Reports**: Generate comprehensive grant reports to meet funder requirements.
- **Progress Tracking**: Track project milestones and outcomes against proposal objectives.
- **AI-Enhanced Reporting**: Leverage AI to create professional, data-driven reports.

### AI-Powered Social Promotion
- **Grant Tweeting Agent**: Create an AI agent that automatically tweets about new grant opportunities.
- **Customizable Promotion**: Configure your Twitter agent to match your organization's voice and target specific grant types.

## Technology Stack

This project is built with:
- React and TypeScript for a robust frontend
- Tailwind CSS and shadcn/ui for responsive design
- Venice AI API for grant matching, proposal generation, and optimization
- ElizaOS for automated social media integration

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Add your Venice AI API key through the application interface
4. Start the development server with `npm run dev`

## Venice AI API Integration

VenThatGrant is powered by the Venice AI API, which provides:
- Access to an extensive database of global funding opportunities
- Natural language processing for grant matching and proposal generation
- AI-driven proposal critique and optimization
- Intelligent reporting capabilities

To use this application, you'll need to obtain an API key from Venice AI and enter it in the application settings.

## Project Structure

- `/src/components`: UI components for the application
- `/src/pages`: Page components for different views
- `/src/services`: Service modules for API interaction and data management
- `/src/hooks`: Custom React hooks
- `/src/config`: Configuration files for API integration

## Deployment

This application can be easily deployed using Lovable's publishing features. Simply navigate to Share -> Publish in your Lovable project.

## Custom Domain Setup

To connect a custom domain to your VenThatGrant deployment, navigate to Project > Settings > Domains in Lovable and follow the instructions.

## Contributing

Contributions to this project are welcome! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
