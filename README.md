d3.forceClustering
==================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

A custom attraction force that groups nodes into clusters based on a shared cluster ID. Nodes within the same cluster are gradually pulled toward their cluster’s dynamic center of gravity, with a spring-like force whose intensity increases linearly with distance.

This force plugin is designed to be used with the [d3-force](https://github.com/d3/d3-force) simulation engine. It is also compatible with [d3-force-3d](https://github.com/vasturiano/d3-force-3d) and can function in a one, two (default) or three-dimensional space.

## Quick start

```js
import d3ForceClustering from 'd3-force-clustering';
```
or using a *script* tag
```html
<script src="//cdn.jsdelivr.net/npm/d3-force-clustering"></script>
```
then
```js
d3.forceSimulation()
  .nodes(<myNodes>)
  .force('cluster', d3.forceClustering()
    .clusterId(node => node.cluster)
  );
```

## API reference

| Method                                 | Description                                                                                                                                                                                                                                                      |        Default         |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------:|
| <b>clusterId</b>([<i>fn</i>]) | Sets or gets the accessor function that returns the cluster ID for each node. Use this to define which cluster a node belongs to.                                                                                                                                | `node => node.cluster` |
| <b>weight</b>([<i>fn</i>]) | Sets or gets the accessor for node weight, which influences the cluster's centroid position. Often proportional to node area, e.g., `node => node.r ** 2`, so that larger nodes move less than smaller ones. By default all nodes have equal weight.             |      `node => 1`       |
| <b>strength</b>([<i>num</i> or <i>fn</i>]) | Sets or gets the force strength. Can be a constant or a function: `(clusterId, clusterNodes) => strength`. This strength defines how strong is the attraction force between the nodes in a given cluster. A strength of `1` applies full force; `0` disables it. | 0.2 |
| <b>distanceMin</b>([<i>num</i>]) | Minimum distance from a node to the cluster’s centroid in order for the attraction force to act. Helps prevent jittering for closely grouped nodes.                                                                                                              | 0 |

## ❤️ Support This Project

If you find this module useful and would like to support its development, you can [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url). Your contributions help keep open-source sustainable!
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)

[npm-img]: https://img.shields.io/npm/v/d3-force-clustering
[npm-url]: https://npmjs.org/package/d3-force-clustering
[build-size-img]: https://img.shields.io/bundlephobia/minzip/d3-force-clustering
[build-size-url]: https://bundlephobia.com/result?p=d3-force-clustering
[npm-downloads-img]: https://img.shields.io/npm/dt/d3-force-clustering
[npm-downloads-url]: https://www.npmtrends.com/d3-force-clustering
