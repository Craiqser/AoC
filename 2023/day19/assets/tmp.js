const workflows = $0.innerText.trim().split(/\r?\n\r?\n/)[0].split('\n');
const parts = $0.innerText.trim().split(/\r?\n\r?\n/)[1].split('\n');
const workflow = {};

function compare(p, w, index) {
    if (w[index].cond === null) {
        if (w[index].next === 'A' || w[index].next === 'R') {
            return w[index].next;
        }
        return compare(p, workflow[w[index].next], 0);
    }
    const v = p[w[index].cat];
    if (w[index].cond === '<') {
        if (v < w[index].val) {
            if (w[index].next === 'A' || w[index].next === 'R') {
                return w[index].next;
            }
            return compare(p, workflow[w[index].next], 0);
        } else {
            return compare(p, w, index+1);
        }
    }
    else if (w[index].cond === '>') {
        if (v > w[index].val) {
            if (w[index].next === 'A' || w[index].next === 'R') {
                return w[index].next;
            }
            return compare(p, workflow[w[index].next], 0);
        } else {
            return compare(p, w, index+1);
        }
    }
}

const parsePart = (line) => {
    return line.split(",").reduce((part, e) => {
    const m = e.match(/(x|m|a|s)=(\d+)/);
    part[m[1]] = parseInt(m[2]);
    return part;
    }, {});
};
const part = parts.map(parsePart);

for (let work of workflows) {
    const w = work.match(/(\w+){(.*)}/);
    const label = w[1];
    const rule = w[2].split(',');
    const rules = [];
    for (let r of rule) {
        const s = r.match(/(a|m|s|x)(<|>)(\d+):(\w+)/);
        if (s) {
            rules.push({cat: s[1], cond: s[2], val: parseInt(s[3]), next: s[4]});
        } else {
            rules.push({cond: null, next: r});
        }
    }

    workflow[label] = rules;
}

let current = 'in';
let total = 0;
part.forEach(p => {
    const val = compare(p, workflow[current], 0);
    if (val === 'A') {
        let sum = 0;
        for (let key in p) {
            if (p.hasOwnProperty(key)) {
                sum += p[key];
            }
        }
        total += sum;
    }
});

console.log('Part 1 ->', total);

const start = { label: 'in', xmin: 1, xmax: 4000, mmin: 1, mmax: 4000, amin: 1, amax: 4000, smin: 1, smax: 4000 };
const queue = [start];
total = 0;

while(queue.length) {
    const part = queue.shift();

    if (part.label === 'R') { continue; }
    if (part.label === 'A') {
        const pieces = (
            (1 + part.xmax - part.xmin) *
            (1 + part.mmax - part.mmin) *
            (1 + part.amax - part.amin) *
            (1 + part.smax - part.smin));
        total += pieces;
        continue;
        }

    workflow[part.label].forEach(rule => {
        if (rule.cond != null) {
            const v = rule.cat;
            const op = rule.cond;
            const val = rule.val;
            const limit = val;
            const next = { ...part, label: rule.next};

            if (op === '<') {
                next[`${v}max`] = Math.min(next[`${v}max`], limit - 1);
                queue.push(next);
                part[`${v}min`] = Math.max(part[`${v}min`], next[`${v}max`] + 1);
            }
            else if (op === '>') {
                next[`${v}min`] = Math.max(next[`${v}min`], limit + 1);
                queue.push(next);
                part[`${v}max`] = Math.min(part[`${v}max`], next[`${v}min`] - 1);
            }
        }
        else {
            queue.push({ ...part, label: rule.next })
        }
    });
}
console.log('Part 2 ->', total);
