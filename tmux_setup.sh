#!/bin/bash
# tmux setup script

tmux new-session -d -s web_development

tmux send-keys -t web_development:0 "nvim" C-m
tmux rename-window -t web_development: 'neovim'

tmux new-window -t web_development:1 -n 'lazygit' 'lazygit'

tmux attach-session -t web_development
