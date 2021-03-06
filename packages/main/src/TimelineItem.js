import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import URI from "@ui5/webcomponents-base/src/types/URI";
import Function from "@ui5/webcomponents-base/src/types/Function";
import { fetchCldrData } from "@ui5/webcomponents-base/src/CLDR";
import { getLocale } from "@ui5/webcomponents-base/src/LocaleProvider";
import Icon from "./Icon";
import Link from "./Link";
import TimelineItemTemplateContext from "./TimelineItemTemplateContext";
import TimelineItemRenderer from "./build/compiled/TimelineItemRenderer.lit";

// Styles
import styles from "./themes-next/TimelineItem.css";

addCustomCSS("ui5-timeline-item", "sap_belize", styles);
addCustomCSS("ui5-timeline-item", "sap_belize_hcb", styles);
addCustomCSS("ui5-timeline-item", "sap_fiori_3", styles);

/**
 * @public
 */
const metadata = {
	tag: "ui5-timeline-item",
	styleUrl: [
		"TimelineItem.css",
	],
	defaultSlot: "description",
	slots: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Determines the description of the <code>ui5-timeline-item</code>.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		description: {
			type: HTMLElement,
			multiple: false,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-timeline-item</code>.
		 * SAP-icons font provides numerous options.
		 * </br></br>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {URI}
		 * @defaultvalue ""
		 * @public
		 */
		icon: { type: URI, defaultValue: null },

		/**
		 * Defines the name of the item.
		 *
		 * @type {String}
		 * @public
		 */
		itemName: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether the name is clickable.
		 *
		 * @type {Boolean}
		 * @public
		 */
		itemNameClickable: {
			type: Boolean,
		},

		/**
		 * Defines the title text of the component.
		 *
		 * @type {String}
		 * @public
		 */
		titleText: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the subtitle text of the component.
		 * @type {String}
		 * @public
		 */
		subtitleText: {
			type: String,
			defaultValue: "",
		},

		_onItemNamePress: {
			type: Function,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Fired when the item name is pressed either with a
		 * click/tap or by using the Enter or Space key.
		 * </br></br>
		 * <b>Note:</b> The event will not be fired if the <code>item-name-clickable</code>
		 * attribute is not set.
		 *
		 * @event
		 * @public
		 */
		itemNamePress: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An entry posted on the timeline.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimelineItem
 * @extends WebComponent
 * @tagname ui5-timeline
 * @usestextcontent
 * @public
 */
class TimelineItem extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TimelineItemRenderer;
	}

	static get calculateTemplateContext() {
		return TimelineItemTemplateContext.calculate;
	}

	constructor() {
		super();

		this._onItemNamePress = this.onItemNamePress.bind(this);
	}

	onItemNamePress() {
		this.fireEvent("itemNamePress", {});
	}

	static async define(...params) {
		await Promise.all([
			fetchCldrData(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			Icon.define(),
			Link.define(),
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	TimelineItem.define();
});

export default TimelineItem;
