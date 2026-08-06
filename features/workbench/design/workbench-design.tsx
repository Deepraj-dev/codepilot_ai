"use client";

import { useState } from "react";
import { assistantSteps, codeLines, fileTree } from "./workbench-design.data";
import styles from "./workbench-design.module.css";

const activityItems = [
  { id: "files", label: "Explorer", icon: "◇" },
  { id: "search", label: "Search", icon: "⌕" },
  { id: "git", label: "Source control", icon: "⑂" },
  { id: "run", label: "Run and debug", icon: "▷" },
  { id: "extensions", label: "Extensions", icon: "▦" },
];

const editorTabs = ["editor-shell.tsx", "page.tsx", "architecture.md"];

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button className={styles.iconButton} type="button" aria-label={label} title={label}>
      {children}
    </button>
  );
}

export function WorkbenchDesign() {
  const [activeActivity, setActiveActivity] = useState("files");
  const [activeTab, setActiveTab] = useState(editorTabs[0]);
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  return (
    <main className={styles.workbench}>
      <header className={styles.titlebar}>
        <div className={styles.brandBlock}>
          <div className={styles.logoMark} aria-hidden="true"><span /></div>
          <span className={styles.brandName}>CodePilot</span>
          <span className={styles.previewBadge}>DESIGN</span>
        </div>

        <button className={styles.commandCenter} type="button">
          <span className={styles.searchGlyph}>⌕</span>
          <span>Search files, commands, and symbols</span>
          <kbd>⌘ K</kbd>
        </button>

        <div className={styles.titleActions}>
          <span className={styles.syncState}><i /> Workspace ready</span>
          <IconButton label="Toggle assistant" >◫</IconButton>
          <button className={styles.avatar} type="button" aria-label="Open account menu">DR</button>
        </div>
      </header>

      <section className={`${styles.workspace} ${assistantOpen ? "" : styles.assistantClosed}`}>
        <nav className={styles.activityRail} aria-label="Workspace tools">
          <div>
            {activityItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.activityButton} ${activeActivity === item.id ? styles.activityActive : ""}`}
                onClick={() => setActiveActivity(item.id)}
                type="button"
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
          <div>
            <button className={styles.activityButton} type="button" aria-label="Accounts" title="Accounts">◎</button>
            <button className={styles.activityButton} type="button" aria-label="Settings" title="Settings">⚙</button>
          </div>
        </nav>

        <aside className={styles.explorer}>
          <div className={styles.panelHeading}>
            <span>EXPLORER</span>
            <IconButton label="Explorer actions">•••</IconButton>
          </div>
          <div className={styles.projectHeading}>
            <span className={styles.chevron}>⌄</span>
            <strong>CODEPILOT-AI</strong>
            <div className={styles.inlineActions}>
              <span title="New file">＋</span><span title="Refresh">↻</span>
            </div>
          </div>
          <div className={styles.fileTree}>
            {fileTree.slice(1).map((item, index) => (
              <button
                type="button"
                key={`${item.name}-${index}`}
                className={`${styles.fileRow} ${item.name === "editor-shell.tsx" ? styles.fileSelected : ""}`}
                style={{ paddingLeft: `${10 + item.depth * 14}px` }}
              >
                <span className={styles.fileIcon} data-kind={item.kind}>
                  {item.kind === "folder" ? (item.open ? "⌄" : "›") : item.name.endsWith(".tsx") ? "TS" : item.name.endsWith(".css") ? "#" : "·"}
                </span>
                <span className={styles.fileName}>{item.name}</span>
                {item.status && <span className={styles.fileStatus}>{item.status === "modified" ? "M" : "U"}</span>}
              </button>
            ))}
          </div>
          <div className={styles.explorerFooter}>
            <button type="button"><span>›</span> OUTLINE</button>
            <button type="button"><span>›</span> TIMELINE</button>
          </div>
        </aside>

        <section className={styles.centerStage}>
          <div className={styles.editorTabs} role="tablist" aria-label="Open files">
            {editorTabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                key={tab}
                className={`${styles.editorTab} ${activeTab === tab ? styles.editorTabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={tab.endsWith(".tsx") ? styles.tsIcon : styles.mdIcon}>{tab.endsWith(".tsx") ? "TS" : "M"}</span>
                {tab}
                {tab === "editor-shell.tsx" && <i className={styles.unsavedDot} />}
                <span className={styles.closeTab}>×</span>
              </button>
            ))}
            <div className={styles.tabSpacer} />
            <IconButton label="Split editor">▥</IconButton>
            <IconButton label="More editor actions">•••</IconButton>
          </div>

          <div className={styles.breadcrumbs}>
            <span>components</span><b>›</b><span>editor</span><b>›</b><span className={styles.tsIcon}>TS</span><strong>{activeTab}</strong><b>›</b><span>EditorShell</span>
          </div>

          <div className={styles.codeAndMap}>
            <div className={styles.codeArea} aria-label="Code editor design preview">
              <div className={styles.codeGutter}>
                {Array.from({ length: 25 }, (_, index) => <span key={index}>{index + 1}</span>)}
              </div>
              <pre className={styles.codeBlock}>
                {codeLines.map(([kind, content], index) => kind === "break" ? <br key={index} /> : <span key={index} className={styles[`token_${kind}`]}>{content}</span>)}
              </pre>
            </div>
            <div className={styles.minimap} aria-hidden="true">
              {Array.from({ length: 31 }, (_, index) => <i key={index} style={{ width: `${25 + ((index * 19) % 65)}%` }} />)}
            </div>
          </div>

          <section className={`${styles.terminal} ${terminalOpen ? "" : styles.terminalCollapsed}`}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalTabs}>
                <button type="button" className={styles.terminalTabActive}>TERMINAL <span>1</span></button>
                <button type="button">PROBLEMS <span>0</span></button>
                <button type="button">OUTPUT</button>
              </div>
              <div className={styles.terminalActions}>
                <span className={styles.terminalName}>zsh</span>
                <IconButton label="New terminal">＋</IconButton>
                <IconButton label={terminalOpen ? "Collapse terminal" : "Expand terminal"}>
                  <span onClick={() => setTerminalOpen((value) => !value)}>{terminalOpen ? "⌄" : "⌃"}</span>
                </IconButton>
                <IconButton label="Close terminal">×</IconButton>
              </div>
            </div>
            {terminalOpen && (
              <div className={styles.terminalBody}>
                <p><span className={styles.promptPath}>~/codepilot-ai</span> <span className={styles.promptBranch}>git:(main)</span> <span className={styles.promptChanged}>✗</span> npm run dev</p>
                <p className={styles.terminalMuted}>▲ Next.js 16.3.0 (Turbopack)</p>
                <p><span className={styles.success}>✓</span> Ready in 842ms</p>
                <p className={styles.terminalMuted}>Local: <span className={styles.terminalLink}>http://localhost:3000</span></p>
                <p><span className={styles.promptPath}>~/codepilot-ai</span> <span className={styles.cursor} /></p>
              </div>
            )}
          </section>
        </section>

        {assistantOpen && (
          <aside className={styles.assistantPanel}>
            <div className={styles.assistantHeader}>
              <div>
                <span className={styles.spark}>✦</span>
                <strong>CodePilot</strong>
                <span className={styles.agentBadge}>AGENT</span>
              </div>
              <div>
                <IconButton label="New chat">＋</IconButton>
                <IconButton label="Chat history">↺</IconButton>
                <button className={styles.iconButton} type="button" aria-label="Close assistant" onClick={() => setAssistantOpen(false)}>×</button>
              </div>
            </div>

            <div className={styles.contextBar}>
              <span>Context</span>
              <button type="button"><span className={styles.contextDot}>7</span> files</button>
              <button type="button">＋ Add context</button>
            </div>

            <div className={styles.conversation}>
              <div className={styles.userMessage}>
                <div className={styles.messageMeta}><strong>You</strong><span>10:42</span></div>
                <p>Build the editor shell with file tabs and keep the state boundaries clean for future workspace integration.</p>
              </div>

              <div className={styles.agentMessage}>
                <div className={styles.messageMeta}>
                  <strong><span className={styles.spark}>✦</span> CodePilot</strong>
                  <span>10:42</span>
                </div>
                <p>I’ll inspect the editor module, map the state ownership, and implement the shell without coupling it to the workspace runtime.</p>

                <div className={styles.agentPlan}>
                  <div className={styles.planHeading}><span>Implementation plan</span><b>2 / 4</b></div>
                  {assistantSteps.map((step) => (
                    <div className={styles.planStep} key={step.label}>
                      <span className={`${styles.stepMarker} ${step.done ? styles.stepDone : ""} ${step.active ? styles.stepActive : ""}`}>
                        {step.done ? "✓" : step.active ? "•" : ""}
                      </span>
                      <div><strong>{step.label}</strong><small>{step.detail}</small></div>
                    </div>
                  ))}
                </div>

                <div className={styles.toolCall}>
                  <span className={styles.toolIcon}>⌁</span>
                  <div><strong>Edited 2 files</strong><small>editor-shell.tsx · file-tabs.tsx</small></div>
                  <button type="button">Review diff</button>
                </div>
              </div>
            </div>

            <div className={styles.composerWrap}>
              <div className={styles.composer}>
                <textarea aria-label="Message CodePilot" placeholder="Ask CodePilot to build, explain, or fix…" rows={3} />
                <div className={styles.composerFooter}>
                  <div><button type="button" className={styles.modeButton}><span>⌘</span> Agent <b>⌄</b></button><button type="button" className={styles.attachButton} aria-label="Attach context">＋</button></div>
                  <button className={styles.sendButton} type="button" aria-label="Send message">↑</button>
                </div>
              </div>
              <div className={styles.modelRow}><span>Claude Sonnet 4.5</span><b>⌄</b><span className={styles.modelSpacer} /><span>3.2k / 200k</span></div>
            </div>
          </aside>
        )}

        {!assistantOpen && (
          <button className={styles.reopenAssistant} type="button" onClick={() => setAssistantOpen(true)} aria-label="Open CodePilot assistant">✦</button>
        )}
      </section>

      <footer className={styles.statusbar}>
        <div><span>⑂ main*</span><span>↻</span><span>ⓧ 0</span><span>△ 0</span></div>
        <div><span>Ln 12, Col 24</span><span>Spaces: 2</span><span>UTF-8</span><span>{`{ }`} TypeScript React</span><span className={styles.statusAgent}>✦ CodePilot ready</span></div>
      </footer>
    </main>
  );
}
