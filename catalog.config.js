module.exports = {
  test: {
    fn: (d)=>`${d.mod}/${d.id}.json`,
    struct: {
      id: "ver",
      type: "eq"
    }
  },
  versions: {
    fn: (d)=>`${d.id}.json`,
    struct: {
      id: "ver",
      type: "eq"
    }
  },
  items: {
    struct: {
      id: "str",
      mod: "str",
      name: "str",
      introduced_at: "ver",
      changed_at: "ver",
      technical: null,
      meta: null
    }
  },
  blocks: {
    struct: {
      id: "str",
      mod: "str",
      name: "str",
      introduced_at: "ver",
      changed_at: "ver",
      technical: null,
      meta: null
    }
  },
  enchantments: {
    struct: {
      id: "str",
      mod: "str",
      name: "str"
    }
  },
  entities: {
    struct: {
      id: "str",
      mod: "str",
      name: "str",
      introduced_at: "ver",
      changed_at: "ver"
    }
  },
  commands: {
    struct: {
      mod: "str",
      name: "str"
    }
  },
  crafting: {
    struct: {
      mod: "str",
      name: "str"
    }
  }
}