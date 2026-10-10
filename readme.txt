=== Moon Blocks ===
Tags: blocks, gutenberg, documentation, wiki, knowledge base
Requires at least: 6.9
Requires PHP: 8.0
Stable tag: 0.4.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Lightweight Gutenberg blocks for documentation, wiki, and knowledge base websites that adapt to any theme.

== Description ==

Moon Blocks is a collection of Gutenberg blocks made for documentation, wiki, and knowledge base websites.

It is designed to blend into your site. Typography and colors come from your theme, and there is no separate dark mode to maintain. Block styles and scripts are loaded only on pages that use the block.

**Blocks**

* **Accordion** groups content into sections that visitors can open and close. Items can start open on wide screens and collapsed on mobile, and a link to an item opens it automatically.
* **Callout** highlights a note, tip, warning, or important point. Each variant has its own icon and an editable label.
* **Tabs** organizes content into panels that visitors switch between with a row of tabs. Tabs work with the keyboard, and a link to a tab, or to content inside it, opens that tab automatically. Without JavaScript, all panels are shown one after another.

**Settings**

* Turn individual blocks on or off. A disabled block is not registered and loads no CSS or JavaScript.
* Optionally set three colors: Primary, Surface, and Border. Colors you leave empty follow your theme.

== Installation ==

1. Upload the `moon-blocks` folder to the `/wp-content/plugins/` directory, or install the plugin from the Plugins screen.
2. Activate the plugin through the Plugins screen.
3. Go to Settings > Moon Blocks to choose which blocks are available and to adjust colors.

== Frequently Asked Questions ==

= Will it match my theme? =

Yes. Fonts and text colors are inherited from your theme, and the default accent, surface, and border colors are derived from your theme's text color.

= Can I turn off blocks I do not use? =

Yes. Open Settings > Moon Blocks > Blocks and switch off any block. Turning off a block also turns off the blocks that belong to it.

= Can I change the colors? =

Yes. Open Settings > Moon Blocks > Appearance to set Primary, Surface, and Border. Please make sure the colors you choose have enough contrast with your theme.

== Changelog ==

= 0.4.0 =

* Added the Tabs block: a row of tabs that switches between panels of free-form content. Tabs can be selected with the mouse, touch, or the arrow, Home, and End keys.
* Links to a tab, or to content inside it, open that tab automatically, including tabs nested inside other tabs. In browsers that support it, find-in-page also opens the tab that contains the match.

= 0.3.1 =

* Fixed the Callout block extending past the content width in themes that do not use border-box sizing.
* Fixed a white background behind the Callout label field in the editor.

= 0.3.0 =

* Added the Accordion block: sections with an editable title and free-form content. Choose the title's heading level (H2 to H6) or plain text.
* Accordion items can start open on desktop and collapsed on mobile, and visitors can always open and close them. Links to an item, or to content inside it, open the item automatically.

= 0.2.0 =

* Added the Callout block with four variants: Info, Tips, Warning, and Important. Each variant shows its own icon and an editable label.
* Added a "Moon Blocks" category to the block inserter.

= 0.1.0 =

* Initial foundation: the Moon Blocks settings screen with per-block switches and optional Primary, Surface, and Border colors.
