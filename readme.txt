=== Moon Blocks ===
Tags: blocks, gutenberg, documentation, wiki, knowledge base
Requires at least: 6.9
Requires PHP: 8.0
Stable tag: 0.2.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Lightweight Gutenberg blocks for documentation, wiki, and knowledge base websites that adapt to any theme.

== Description ==

Moon Blocks is a collection of Gutenberg blocks made for documentation, wiki, and knowledge base websites.

It is designed to blend into your site. Typography and colors come from your theme, and there is no separate dark mode to maintain. Block styles and scripts are loaded only on pages that use the block.

**Blocks**

* **Callout** highlights a note, tip, warning, or important point. Each variant has its own icon and an editable label.

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

= 0.2.0 =

* Added the Callout block with four variants: Info, Tips, Warning, and Important. Each variant shows its own icon and an editable label.
* Added a "Moon Blocks" category to the block inserter.

= 0.1.0 =

* Initial foundation: the Moon Blocks settings screen with per-block switches and optional Primary, Surface, and Border colors.
