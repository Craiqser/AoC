// Find groups in the graph using union-find algorithm.
export const find = (vertexCount, edges, desiredCuts) => {
	for (let i = 0; i < edges.length; ++i) {
		const idx = Math.floor(Math.random() * (i + 1));
		[edges[i], edges[idx]] = [edges[idx], edges[i]];
	}

	const groupParents = [-1];
	const vertexGroups = new Uint16Array(vertexCount);
	const groupPromotions = [-1];

	function union(v1, v2) {
		if (!vertexGroups[v1] && !vertexGroups[v2]) {
			// Union operation implementation for new groups
			const group = groupParents.length;
			groupParents.push(group);
			groupPromotions.push(1);
			vertexGroups[v1] = group;
			vertexGroups[v2] = group;
		} else if (!vertexGroups[v1]) {
			// Union operation implementation when v1 is not in a group
			const g = (vertexGroups[v2] = parent(v2));
			++groupPromotions[g];
			vertexGroups[v1] = g;
		} else if (!vertexGroups[v2]) {
			// Union operation implementation when v2 is not in a group
			const g = (vertexGroups[v1] = parent(v1));
			++groupPromotions[g];
			vertexGroups[v2] = g;
		} else {
			// Union operation implementation for merging existing groups
			let g1 = parent(v1);
			let g2 = parent(v2);

			if (g1 !== g2) {
				if (groupPromotions[g1] > groupPromotions[g2]) {
					[g2, g1] = [g1, g2];
				}
				groupPromotions[g2] += groupPromotions[g1] + 1;
				groupParents[g1] = g2;
				vertexGroups[v1] = g2;
				vertexGroups[v2] = g2;
			} else {
				return false;
			}
		}
		return true;
	}

	function parent(v) {
		// Find the parent of a group
		if (vertexGroups[v] === 0) return -1;

		let group = vertexGroups[v];
		while (group !== groupParents[group]) {
			group = groupParents[group];
		}

		return group;
	}

	let edgeIdx = 0;
	while (vertexCount > 2) {
		const [v1, v2] = edges[edgeIdx++];

		if (union(v1, v2)) --vertexCount;
	}

	let removedEdges = 0;
	for (const [v1, v2] of edges) {
		if ((vertexGroups[v1] = parent(v1)) !== (vertexGroups[v2] = parent(v2))) {
			++removedEdges;
		}
	}

	return removedEdges === desiredCuts ? vertexGroups : null;
}
