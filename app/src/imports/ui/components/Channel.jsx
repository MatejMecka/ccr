import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Captions, Streaming } from '../../api/captions.js';

import Caption from '../components/Caption.jsx';

class Channel extends Component {
	componentDidMount() {
		this.refs.tab.setAttribute('uk-tab', '');
	}

	renderCaptions() {
		return this.props.captions.map((caption) => {
			return <Caption key={caption._id} caption={caption} />;
		});
	}

	render() {
		return (
			<div className="uk-width-1@s uk-width-1-2@m uk-width-1-3@l uk-width-large@xl">
				<div className="uk-card uk-card-default uk-padding-small">

					<div className="uk-position-relative sortable-handle">
						<ul ref="tab" className="uk-flex-right uk-margin-remove-bottom">
							<li className="uk-active"><a href="#">Captions</a></li>
						</ul>
						<div className="uk-position-top-left">
							<h4 className="uk-h4 uk-margin-remove-top uk-margin-remove-bottom uk-display-inline ">
								<a ref="editChannel" href="#channel-modal"
									className="uk-link-muted">
									{this.props.channel.title}
								</a>
							</h4>
						</div>
					</div>

					<table className="channel__table uk-table uk-margin-small uk-table-small uk-text-small">
						<tbody>
							{this.renderCaptions()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

Channel.propTypes = {
	channel: PropTypes.object.isRequired,
	captions: PropTypes.array.isRequired,
};

export default createContainer((props) => {
	Meteor.subscribe('captions', props.channel._id);

	// var captions = Streaming.find({
	// 	channel: props.channel._id
	// }).fetch();

	var captions = Captions.find({channel: props.channel._id}).fetch();

	// console.log(captions);

	// var captions = Captions.find({
	// 	channel: props.channel._id
	// }, {
	// 	limit: 4,
	// 	sort: {
	// 		start: -1
	// 	}
	// }).fetch().reverse();

	return { captions: captions };
}, Channel);
