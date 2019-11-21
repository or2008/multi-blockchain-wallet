# Webapp
echo copying dist to webapp...
rm -rf /Users/orbachar/work/localcoin_main/webapp/client/node_modules/multi-blockchain-wallet/dist
mkdir -p  /Users/orbachar/work/localcoin_main/webapp/client/node_modules/multi-blockchain-wallet/dist
cp -r ./dist /Users/orbachar/work/localcoin_main/webapp/client/node_modules/multi-blockchain-wallet

# Widget
echo copying dist to widget_convert...
rm -rf /Users/orbachar/work/localcoin_main/widget_convert/client/node_modules/multi-blockchain-wallet/dist
mkdir -p  /Users/orbachar/work/localcoin_main/widget_convert/client/node_modules/multi-blockchain-wallet/dist
cp -r ./dist /Users/orbachar/work/localcoin_main/widget_convert/client/node_modules/multi-blockchain-wallet
