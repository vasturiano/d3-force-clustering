export default function(clusterId = (node => node.cluster)) {
  let nDim,
    nodes = [],
    weight = constant(1),            // accessor: node weight to calculate cluster centroid
    strength = constant(0.2),        // accessor: attraction strength per cluster (clusterId and nodes are included as arguments)
    minDistance = 0,
    clusterNodes = new Map();

  function force(alpha) {
    const centroids = new Map([...clusterNodes.entries()].map(([cluster, nodes]) => [cluster, getCentroid(nodes, weight, nDim)]));
    const strengths = new Map([...clusterNodes.entries()].map(([cluster, nodes]) => [cluster, strength(cluster, nodes)]));

    const dims = ['x', nDim > 1 && 'y', nDim > 2 && 'z'].filter(d => d);
    const vDims = dims.map(dim => `v${dim}`);

    nodes.forEach(node => {
      const cluster = clusterId(node);

      if (!centroids.has(cluster)) return; // unknown cluster
      const centroid = centroids.get(cluster);

      const d = dims.map(dim => centroid[dim] - node[dim]);

      if (calcDist(...d) <= minDistance) return; // Too close to centroid

      const acceleration = strengths.get(cluster) * alpha;

      vDims.forEach((vDim, idx) => node[vDim] += d[idx] * acceleration);
    });
  }

  function initialize() {
    clusterNodes.clear();
    nodes.forEach(node => {
      const cluster = clusterId(node);
      if (!clusterNodes.has(cluster)) clusterNodes.set(cluster, []);
      clusterNodes.get(cluster).push(node);
    });

    // Ignore clusters with a single element
    clusterNodes.forEach((nodes, cluster) => nodes.length <= 1 && clusterNodes.delete(cluster));
  }

  force.initialize = function(initNodes, ...args) {
    nodes = initNodes;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.clusterId = function(_) {
    return arguments.length ? (clusterId = _, initialize(), force) : clusterId;
  };

  force.weight = function(_) {
    return arguments.length ? (weight = typeof _ === 'function' ? _ : constant(+_), force) : weight;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === 'function' ? _ : constant(+_), force) : strength;
  };

  force.minDistance = function(_) {
    return arguments.length ? (minDistance = _, force) : minDistance;
  };

  return force;
}

//

function calcDist(x, y = 0, z = 0) {
  return Math.sqrt(x*x + y*y + z*z);
}

function constant(x) {
  return () => x;
}

function getCentroid(nodes, weightFn, nDim) {
  let k = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  nodes.forEach(node => {
    const w = weightFn(node);
    x += node.x * w;
    nDim > 1 && (y += node.y * w);
    nDim > 2 && (z += node.z * w);
    k += w;
  });

  const res = {};
  res.x = x / k;
  nDim > 1 && (res.y = y / k);
  nDim > 2 && (res.z = z / k);

  return res;
}